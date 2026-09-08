'use client'

import { useState } from 'react'
import { useOnboardingStore } from '@/store/onboarding'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

const TECH_OPTIONS = [
  'React', 'Next.js', 'Vue.js', 'Angular', 'Svelte',
  'Node.js', 'Express.js', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'Laravel',
  'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#', 'Go', 'PHP', 'Ruby',
  'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Firebase',
  'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'SASS',
  'React Native', 'Flutter', 'Android', 'iOS',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
  'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'scikit-learn',
  'REST APIs', 'GraphQL', 'WebSockets',
]

export function Step6Projects() {
  const { projectTitle, techStack, setField } = useOnboardingStore()
  const [techSearch, setTechSearch] = useState('')

  const suggestions = techSearch.trim()
    ? TECH_OPTIONS.filter(
        (t) => t.toLowerCase().includes(techSearch.toLowerCase()) && !techStack.includes(t)
      ).slice(0, 6)
    : []

  function addTech(tech: string) {
    if (!techStack.includes(tech)) {
      setField('techStack', [...techStack, tech])
    }
    setTechSearch('')
  }

  function removeTech(tech: string) {
    setField('techStack', techStack.filter((t) => t !== tech))
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="projectTitle">Project Title</Label>
        <Input
          id="projectTitle"
          placeholder="e.g. Student Result Management System"
          value={projectTitle}
          onChange={(e) => setField('projectTitle', e.target.value)}
          className="bg-background border-border/60"
        />
      </div>

      <div className="space-y-2">
        <Label>Tech Stack Used</Label>
        <Input
          placeholder="Search technologies..."
          value={techSearch}
          onChange={(e) => setTechSearch(e.target.value)}
          className="bg-background border-border/60"
        />

        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => addTech(t)}
                className="px-3 py-1 text-xs rounded-full border border-border/60 bg-background text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                + {t}
              </button>
            ))}
          </div>
        )}

        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-border/50 bg-background min-h-[52px]">
            {techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="gap-1.5 bg-cyan/10 text-cyan border-cyan/20"
              >
                {tech}
                <button type="button" onClick={() => removeTech(tech)}>
                  <X className="h-3 w-3 hover:text-danger transition-colors" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
