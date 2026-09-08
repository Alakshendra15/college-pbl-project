import { CareerAnalysisResult } from '@/types/career'
import { ExternalLink, BookOpen, FileText, Code, Video } from 'lucide-react'

const resourceIcons = {
  course: BookOpen,
  doc: FileText,
  project: Code,
  video: Video,
}

export function RoadmapTimeline({ data }: { data: CareerAnalysisResult }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-6">
      <h3 className="font-semibold text-foreground mb-1">Your Learning Roadmap</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Personalized plan to become a {data.recommendedRole}
      </p>

      <div className="space-y-6">
        {data.roadmap.map((phase, i) => (
          <div key={phase.phase} className="relative flex gap-4">
            {/* Timeline connector */}
            {i < data.roadmap.length - 1 && (
              <div className="absolute left-5 top-10 bottom-0 w-px bg-border/50" />
            )}

            {/* Phase number */}
            <div className="shrink-0 h-10 w-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center z-10">
              <span className="text-sm font-bold text-primary">{phase.phase}</span>
            </div>

            <div className="flex-1 pb-2">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-foreground">{phase.title}</h4>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {phase.durationWeeks}w
                </span>
              </div>

              <ul className="space-y-1 mb-3">
                {phase.actions.map((action, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary mt-1.5 shrink-0">•</span>
                    {action}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {phase.resources.map((resource, j) => {
                  const Icon = resourceIcons[resource.type] || FileText
                  return (
                    <a
                      key={j}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-background border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                    >
                      <Icon className="h-3 w-3" />
                      {resource.title}
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
