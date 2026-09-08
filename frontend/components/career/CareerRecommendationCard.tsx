import { CareerAnalysisResult } from '@/types/career'
import { Badge } from '@/components/ui/badge'
import { Building2, IndianRupee, Briefcase } from 'lucide-react'

function formatSalary(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  return `₹${(n / 1000).toFixed(0)}K`
}

export function CareerRecommendationCard({ data }: { data: CareerAnalysisResult }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-6">
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-sm text-primary font-medium mb-1">Recommended Career Path</p>
            <h2 className="text-2xl font-bold text-foreground">{data.recommendedRole}</h2>
          </div>
          <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 shrink-0">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{data.roleDescription}</p>

        <div className="flex flex-wrap items-center gap-4 mb-5">
          <div className="flex items-center gap-1.5 text-sm">
            <IndianRupee className="h-4 w-4 text-success" />
            <span className="text-foreground font-medium">
              {formatSalary(data.salaryMin)} – {formatSalary(data.salaryMax)}
            </span>
            <span className="text-muted-foreground">/ year</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
            <Building2 className="h-4 w-4" />
            <span>Top companies hiring</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.topCompanies.slice(0, 6).map((company) => (
              <Badge key={company} variant="secondary" className="bg-card text-muted-foreground border-border/60">
                {company}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
