'use client'

import { CareerAnalysisResult } from '@/types/career'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, XCircle } from 'lucide-react'

interface SkillGroup {
  label: string
  skills: string[]
  color: string
  bg: string
  icon: React.ReactNode
}

export function SkillGapChart({ data }: { data: CareerAnalysisResult }) {
  const groups: SkillGroup[] = [
    {
      label: 'You have',
      skills: data.currentSkills,
      color: 'text-success',
      bg: 'bg-success/10 border-success/30',
      icon: <CheckCircle2 className="h-4 w-4 text-success" />,
    },
    {
      label: 'Partially known',
      skills: data.partialSkills,
      color: 'text-warning',
      bg: 'bg-warning/10 border-warning/30',
      icon: <Clock className="h-4 w-4 text-warning" />,
    },
    {
      label: 'Need to learn',
      skills: data.missingSkills,
      color: 'text-danger',
      bg: 'bg-danger/10 border-danger/30',
      icon: <XCircle className="h-4 w-4 text-danger" />,
    },
  ]

  const total =
    data.currentSkills.length + data.partialSkills.length + data.missingSkills.length

  return (
    <div className="rounded-xl border border-border/60 bg-card p-6">
      <h3 className="font-semibold text-foreground mb-1">Skill Gap Analysis</h3>
      <p className="text-sm text-muted-foreground mb-5">
        {total} skills assessed for {data.recommendedRole}
      </p>

      {/* Progress bar */}
      <div className="flex h-3 rounded-full overflow-hidden mb-6 gap-px">
        <div
          className="bg-success transition-all"
          style={{ width: `${(data.currentSkills.length / total) * 100}%` }}
        />
        <div
          className="bg-warning transition-all"
          style={{ width: `${(data.partialSkills.length / total) * 100}%` }}
        />
        <div
          className="bg-danger transition-all"
          style={{ width: `${(data.missingSkills.length / total) * 100}%` }}
        />
      </div>

      <div className="space-y-4">
        {groups.map((group) => (
          <div key={group.label}>
            <div className="flex items-center gap-2 mb-2">
              {group.icon}
              <span className={`text-sm font-medium ${group.color}`}>
                {group.label} ({group.skills.length})
              </span>
            </div>
            {group.skills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-2.5 py-0.5 text-xs rounded-full border ${group.bg}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">None</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
