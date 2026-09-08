export interface Job {
  id: string
  title: string
  company: string
  companyLogo?: string
  location: string
  employmentType: 'Full-time' | 'Part-time' | 'Internship' | 'Contract'
  experienceLevel: 'Entry Level' | 'Mid Level' | 'Senior Level'
  salaryMin?: number
  salaryMax?: number
  description: string
  skills: string[]
  applyLink: string
  postedAt: string // ISO date string
}

export interface JobFilter {
  q?: string
  location?: string
  type?: string
  experience?: string
  page?: number
  limit?: number
}

export interface JobSearchResult {
  jobs: Job[]
  total: number
  page: number
  hasMore: boolean
}

export interface ParsedResume {
  name?: string
  email?: string
  skills: string[]
  education: string[]
}
