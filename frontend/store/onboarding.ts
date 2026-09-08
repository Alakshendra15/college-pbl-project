'use client'

import { create } from 'zustand'

export interface OnboardingState {
  step: number
  name: string
  age: string
  education: 'undergraduate' | 'graduate' | 'postgraduate' | ''
  state: string
  city: string
  skills: string[]
  experienceType: 'theoretical' | 'practical' | ''
  projectTitle: string
  techStack: string[]
  setStep: (step: number) => void
  setField: <K extends keyof Omit<OnboardingState, 'setStep' | 'setField' | 'reset'>>(
    key: K,
    value: OnboardingState[K]
  ) => void
  reset: () => void
}

const initial = {
  step: 1,
  name: '',
  age: '',
  education: '' as const,
  state: '',
  city: '',
  skills: [] as string[],
  experienceType: '' as const,
  projectTitle: '',
  techStack: [] as string[],
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initial,
  setStep: (step) => set({ step }),
  setField: (key, value) => set({ [key]: value } as Partial<OnboardingState>),
  reset: () => set(initial),
}))
