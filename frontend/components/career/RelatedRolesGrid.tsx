import { CareerAnalysisResult } from '@/types/career'
import { cn } from '@/lib/utils'

function matchColor(pct: number) {
  if (pct >= 75) return 'text-success bg-success/10 border-success/30'
  if (pct >= 60) return 'text-warning bg-warning/10 border-warning/30'
  return 'text-muted-foreground bg-muted border-border/50'
}

export function RelatedRolesGrid({ data }: { data: CareerAnalysisResult }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-6">
      <h3 className="font-semibold text-foreground mb-1">Other Career Paths</h3>
      <p className="text-sm text-muted-foreground mb-5">
        Alternative roles that match your profile
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.relatedRoles.map((role) => (
          <div
            key={role.title}
            className="p-4 rounded-lg border border-border/60 bg-background hover:border-border transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-medium text-foreground text-sm">{role.title}</h4>
              <span
                className={cn(
                  'shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border',
                  matchColor(role.matchPercent)
                )}
              >
                {role.matchPercent}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{role.reason}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
