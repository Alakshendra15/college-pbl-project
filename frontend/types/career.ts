export interface RoadmapResource {
  title: string
  url: string
  type: 'course' | 'doc' | 'project' | 'video'
}

export interface RoadmapPhase {
  phase: number
  title: string
  durationWeeks: number
  actions: string[]
  resources: RoadmapResource[]
}

export interface RelatedRole {
  title: string
  matchPercent: number
  reason: string
}

export interface CareerAnalysisResult {
  recommendedRole: string
  roleDescription: string
  currentSkills: string[]
  missingSkills: string[]
  partialSkills: string[]
  roadmap: RoadmapPhase[]
  relatedRoles: RelatedRole[]
  salaryMin: number
  salaryMax: number
  topCompanies: string[]
}

export interface CareerAnalysisResponse {
  cached: boolean
  data: CareerAnalysisResult
}
