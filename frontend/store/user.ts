'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthUser } from '@/types/user'

interface UserState {
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: 'career-user' }
  )
)
