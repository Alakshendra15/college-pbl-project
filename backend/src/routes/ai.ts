import { Router, Request, Response } from 'express'
import { db } from '../db'
import { users, userProfiles, careerAnalyses } from '../db/schema'
import { eq } from 'drizzle-orm'
import { requireAuth } from '../middleware/auth'
import { analyzeCareer } from '../services/ai.service'
import { randomUUID, createHash } from 'crypto'

const router = Router()
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

function computeProfileHash(profile: object): string {
  return createHash('sha256').update(JSON.stringify(profile)).digest('hex')
}

router.post('/career-analysis', requireAuth, async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!

  const user = db.select().from(users).where(eq(users.id, userId)).get()
  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }

  const profile = db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).get()
  if (!profile || !profile.completed) {
    res.status(400).json({ error: 'Please complete onboarding first' })
    return
  }

  const profileInput = {
    name: user.name,
    education: profile.education,
    city: profile.city,
    state: profile.state,
    skills: profile.skills ? JSON.parse(profile.skills) : [],
    experienceType: profile.experienceType,
    projectTitle: profile.projectTitle,
    techStack: profile.techStack ? JSON.parse(profile.techStack) : [],
  }

  const profileHash = computeProfileHash(profileInput)

  // Check cache
  const cached = db.select().from(careerAnalyses).where(eq(careerAnalyses.userId, userId)).get()
  if (cached && cached.profileHash === profileHash) {
    const age = Date.now() - (cached.generatedAt?.getTime() ?? 0)
    if (age < CACHE_TTL_MS) {
      res.json({
        cached: true,
        data: {
          recommendedRole: cached.recommendedRole,
          roleDescription: cached.roleDescription,
          currentSkills: cached.currentSkills ? JSON.parse(cached.currentSkills) : [],
          missingSkills: cached.missingSkills ? JSON.parse(cached.missingSkills) : [],
          partialSkills: cached.partialSkills ? JSON.parse(cached.partialSkills) : [],
          roadmap: cached.roadmap ? JSON.parse(cached.roadmap) : [],
          relatedRoles: cached.relatedRoles ? JSON.parse(cached.relatedRoles) : [],
          salaryMin: cached.salaryMin,
          salaryMax: cached.salaryMax,
          topCompanies: cached.topCompanies ? JSON.parse(cached.topCompanies) : [],
        },
      })
      return
    }
  }

  // Generate new analysis
  const result = await analyzeCareer(profileInput)

  const analysisData = {
    userId,
    recommendedRole: result.recommendedRole,
    roleDescription: result.roleDescription,
    currentSkills: JSON.stringify(result.currentSkills),
    missingSkills: JSON.stringify(result.missingSkills),
    partialSkills: JSON.stringify(result.partialSkills),
    roadmap: JSON.stringify(result.roadmap),
    relatedRoles: JSON.stringify(result.relatedRoles),
    salaryMin: result.salaryMin,
    salaryMax: result.salaryMax,
    topCompanies: JSON.stringify(result.topCompanies),
    profileHash,
  }

  if (cached) {
    db.update(careerAnalyses).set(analysisData).where(eq(careerAnalyses.userId, userId)).run()
  } else {
    db.insert(careerAnalyses).values({ id: randomUUID(), ...analysisData }).run()
  }

  res.json({ cached: false, data: result })
})

export default router
