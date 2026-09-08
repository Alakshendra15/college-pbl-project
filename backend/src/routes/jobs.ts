import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { requireAuth } from '../middleware/auth'
import { searchJobs } from '../services/jobs.service'

const router = Router()

const querySchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  experience: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(20).default(6),
})

router.get('/', requireAuth, async (req: Request, res: Response): Promise<void> => {
  const parsed = querySchema.safeParse(req.query)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0].message })
    return
  }

  const result = await searchJobs(parsed.data)
  res.json(result)
})

export default router
