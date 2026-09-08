import { CareerAnalysisResult } from '../types/career'
import { mockCareerAnalysis } from '../mock/careerAnalysis.mock'

export interface UserProfileInput {
  name: string
  education?: string | null
  city?: string | null
  state?: string | null
  skills?: string[] | null
  experienceType?: string | null
  projectTitle?: string | null
  techStack?: string[] | null
}

export async function analyzeCareer(profile: UserProfileInput): Promise<CareerAnalysisResult> {
  // Mock implementation — replace the body of this function with real Claude API call:
  //
  // import Anthropic from '@anthropic-ai/sdk'
  // const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  // const message = await client.messages.create({
  //   model: 'claude-3-5-haiku-20241022',
  //   max_tokens: 2048,
  //   messages: [{ role: 'user', content: buildPrompt(profile) }],
  // })
  // return JSON.parse((message.content[0] as any).text)

  // Personalize mock data with user's actual skills if provided
  const result = { ...mockCareerAnalysis }

  if (profile.skills && profile.skills.length > 0) {
    const userSkillsLower = profile.skills.map((s) => s.toLowerCase())
    result.currentSkills = profile.skills
    result.missingSkills = mockCareerAnalysis.missingSkills.filter(
      (s) => !userSkillsLower.includes(s.toLowerCase())
    )
  }

  if (profile.techStack && profile.techStack.length > 0) {
    const combined = [...new Set([...result.currentSkills, ...profile.techStack])]
    result.currentSkills = combined
  }

  return result
}

// Kept for documentation / future use
function buildPrompt(profile: UserProfileInput): string {
  return `
You are a senior career counselor specializing in the Indian tech job market.

## Candidate Profile
- Name: ${profile.name}
- Education: ${profile.education ?? 'Not specified'}
- Location: ${profile.city}, ${profile.state}, India
- Experience type: ${profile.experienceType}
- Current Skills: ${profile.skills?.join(', ') || 'Not specified'}
${profile.experienceType === 'practical' ? `- Project: "${profile.projectTitle}" | Tech stack: ${profile.techStack?.join(', ')}` : ''}

Respond with valid JSON matching this schema (no markdown fences):
{
  "recommendedRole": "string",
  "roleDescription": "string",
  "currentSkills": ["string"],
  "missingSkills": ["string"],
  "partialSkills": ["string"],
  "roadmap": [{ "phase": number, "title": "string", "durationWeeks": number, "actions": ["string"], "resources": [{ "title": "string", "url": "string", "type": "course|doc|project|video" }] }],
  "relatedRoles": [{ "title": "string", "matchPercent": number, "reason": "string" }],
  "salaryMin": number,
  "salaryMax": number,
  "topCompanies": ["string"]
}
  `.trim()
}
