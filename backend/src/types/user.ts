export interface OnboardingData {
  name: string
  age: number
  education: 'undergraduate' | 'graduate' | 'postgraduate'
  state: string
  city: string
  skills: string[]
  experienceType: 'theoretical' | 'practical'
  projectTitle?: string
  techStack?: string[]
}

export interface UserProfileData {
  id: string
  userId: string
  name: string
  email: string
  age?: number
  education?: string
  state?: string
  city?: string
  skills?: string[]
  experienceType?: string
  projectTitle?: string
  techStack?: string[]
  completed?: boolean
}

// Augment Express Request to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}
