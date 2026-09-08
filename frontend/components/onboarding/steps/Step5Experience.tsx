'use client'

import { useOnboardingStore } from '@/store/onboarding'
import { BookOpen, Code2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Step5Experience() {
  const { experienceType, setField } = useOnboardingStore()

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        How have you primarily gained your technical knowledge?
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setField('experienceType', 'theoretical')}
          className={cn(
            'flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200',
            experienceType === 'theoretical'
              ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
              : 'border-border/60 bg-background hover:border-border hover:bg-card'
          )}
        >
          <BookOpen
            className={cn(
              'h-8 w-8',
              experienceType === 'theoretical' ? 'text-primary' : 'text-muted-foreground'
            )}
          />
          <div className="text-center">
            <p className={cn('font-semibold', experienceType === 'theoretical' ? 'text-primary' : 'text-foreground')}>
              Theoretical
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Classroom learning, courses, self-study — no project experience yet
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setField('experienceType', 'practical')}
          className={cn(
            'flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200',
            experienceType === 'practical'
              ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
              : 'border-border/60 bg-background hover:border-border hover:bg-card'
          )}
        >
          <Code2
            className={cn(
              'h-8 w-8',
              experienceType === 'practical' ? 'text-primary' : 'text-muted-foreground'
            )}
          />
          <div className="text-center">
            <p className={cn('font-semibold', experienceType === 'practical' ? 'text-primary' : 'text-foreground')}>
              Practical (Projects)
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Built real projects — personal, college, freelance, or internship
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}
