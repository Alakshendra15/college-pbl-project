import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../db'
import { users, userProfiles } from '../db/schema'
import { eq } from 'drizzle-orm'
import { requireAuth } from '../middleware/auth'
import { randomUUID } from 'crypto'

const router = Router()

const onboardingSchema = z.object({
  name: z.string().min(2).max(100),
  age: z.number().int().min(15).max(60),
  education: z.enum(['undergraduate', 'graduate', 'postgraduate']),
  state: z.string().min(2),
  city: z.string().min(2),
  skills: z.array(z.string()).min(1),
  experienceType: z.enum(['theoretical', 'practical']),
  projectTitle: z.string().optional(),
  techStack: z.array(z.string()).optional(),
})

router.post('/onboarding', requireAuth, async (req: Request, res: Response): Promise<void> => {
  const parsed = onboardingSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message })
    return
  }

  const userId = req.userId!
  const data = parsed.data

  // Update user name if changed
  db.update(users).set({ name: data.name }).where(eq(users.id, userId)).run()

  const existing = db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).get()

  const profileData = {
    userId,
    age: data.age,
    education: data.education,
    state: data.state,
    city: data.city,
    skills: JSON.stringify(data.skills),
    experienceType: data.experienceType,
    projectTitle: data.projectTitle ?? null,
    techStack: data.techStack ? JSON.stringify(data.techStack) : null,
    completed: true,
  }

  if (existing) {
    db.update(userProfiles).set(profileData).where(eq(userProfiles.userId, userId)).run()
  } else {
    db.insert(userProfiles).values({ id: randomUUID(), ...profileData }).run()
  }

  res.json({ success: true })
})

router.get('/profile', requireAuth, async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!

  const user = db.select().from(users).where(eq(users.id, userId)).get()
  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }

  const profile = db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).get()

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    profile: profile
      ? {
          age: profile.age,
          education: profile.education,
          state: profile.state,
          city: profile.city,
          skills: profile.skills ? JSON.parse(profile.skills) : [],
          experienceType: profile.experienceType,
          projectTitle: profile.projectTitle,
          techStack: profile.techStack ? JSON.parse(profile.techStack) : [],
          completed: profile.completed,
        }
      : null,
  })
})

export default router
