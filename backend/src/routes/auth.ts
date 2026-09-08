import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../db'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'
import { hashPassword, comparePassword, signToken } from '../services/auth.service'
import { randomUUID } from 'crypto'

const router = Router()

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  secure: process.env.NODE_ENV === 'production',
}

const signupSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  const parsed = signupSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message })
    return
  }

  const { name, email, password } = parsed.data

  const existing = db.select().from(users).where(eq(users.email, email)).get()
  if (existing) {
    res.status(409).json({ error: 'An account with this email already exists' })
    return
  }

  const hashed = await hashPassword(password)
  const id = randomUUID()

  db.insert(users).values({ id, name, email, password: hashed }).run()

  const token = await signToken(id, email)
  res.cookie('auth_token', token, COOKIE_OPTIONS)
  res.status(201).json({ user: { id, name, email } })
})

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message })
    return
  }

  const { email, password } = parsed.data

  const user = db.select().from(users).where(eq(users.email, email)).get()
  if (!user) {
    res.status(401).json({ error: 'Invalid email or password' })
    return
  }

  const valid = await comparePassword(password, user.password)
  if (!valid) {
    res.status(401).json({ error: 'Invalid email or password' })
    return
  }

  const token = await signToken(user.id, user.email)
  res.cookie('auth_token', token, COOKIE_OPTIONS)
  res.json({ user: { id: user.id, name: user.name, email: user.email } })
})

router.post('/logout', (_req: Request, res: Response): void => {
  res.clearCookie('auth_token')
  res.json({ success: true })
})

export default router
