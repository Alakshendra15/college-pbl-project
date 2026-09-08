import { Job } from '@/types/jobs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, IndianRupee, ExternalLink } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

function formatSalary(min?: number, max?: number) {
  if (!min && !max) return null
  const fmt = (n: number) => (n >= 100000 ? `${(n / 100000).toFixed(1)}L` : `${(n / 1000).toFixed(0)}K`)
  if (min && max) return `₹${fmt(min)} – ₹${fmt(max)}`
  if (min) return `₹${fmt(min)}+`
  return null
}

const typeColors: Record<string, string> = {
  'Full-time': 'text-success bg-success/10 border-success/30',
  Internship: 'text-cyan bg-cyan/10 border-cyan/30',
  'Part-time': 'text-warning bg-warning/10 border-warning/30',
  Contract: 'text-muted-foreground bg-muted border-border/50',
}

export function JobCard({ job }: { job: Job }) {
  const salary = formatSalary(job.salaryMin, job.salaryMax)
  const typeColor = typeColors[job.employmentType] || typeColors['Contract']

  return (
    <div className="group p-5 rounded-xl border border-border/60 bg-card hover:border-border hover:shadow-lg hover:shadow-black/20 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {job.title}
          </h3>
          <p className="text-sm text-muted-foreground font-medium">{job.company}</p>
        </div>
        <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
          <span className="text-sm font-bold text-primary">{job.company.charAt(0)}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {job.location}
        </span>
        {salary && (
          <span className="flex items-center gap-1 text-success font-medium">
            <IndianRupee className="h-3 w-3" />
            {salary}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
        </span>
      </div>

      <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeColor}`}>
          {job.employmentType}
        </span>
        {job.skills.slice(0, 3).map((skill) => (
          <Badge key={skill} variant="secondary" className="text-xs bg-background border-border/50 text-muted-foreground">
            {skill}
          </Badge>
        ))}
        {job.skills.length > 3 && (
          <span className="text-xs text-muted-foreground px-2 py-0.5">+{job.skills.length - 3}</span>
        )}
      </div>

      <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
        <Button size="sm" className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/30 hover:border-primary transition-all gap-2">
          Apply Now
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </a>
    </div>
  )
}
