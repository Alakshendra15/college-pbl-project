export interface AuthUser {
  id: string
  name: string
  email: string
}

export interface UserProfileData {
  age?: number
  education?: 'undergraduate' | 'graduate' | 'postgraduate'
  state?: string
  city?: string
  skills?: string[]
  experienceType?: 'theoretical' | 'practical'
  projectTitle?: string
  techStack?: string[]
  completed?: boolean
}

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
