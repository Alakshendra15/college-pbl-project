'use client'

import { useState } from 'react'
import { useOnboardingStore } from '@/store/onboarding'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

const COMMON_SKILLS = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C', 'C#', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'R',
  'React', 'Angular', 'Vue.js', 'Next.js', 'Svelte', 'jQuery', 'Bootstrap', 'Tailwind CSS',
  'Node.js', 'Express.js', 'NestJS', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'Laravel', 'ASP.NET',
  'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Redis', 'Firebase', 'Supabase',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Linux', 'Git', 'GitHub',
  'HTML', 'CSS', 'SASS', 'REST APIs', 'GraphQL', 'WebSockets',
  'Figma', 'Adobe XD', 'Photoshop',
  'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'scikit-learn',
  'Data Analysis', 'Power BI', 'Tableau', 'Excel', 'SQL',
  'React Native', 'Flutter', 'Android Development', 'iOS Development',
  'Agile', 'Scrum', 'JIRA', 'Postman',
  'Problem Solving', 'Data Structures', 'Algorithms',
]

export function Step4Skills() {
  const { skills, setField } = useOnboardingStore()
  const [search, setSearch] = useState('')

  const suggestions = search.trim()
    ? COMMON_SKILLS.filter(
        (s) =>
          s.toLowerCase().includes(search.toLowerCase()) && !skills.includes(s)
      ).slice(0, 8)
    : []

  function addSkill(skill: string) {
    if (!skills.includes(skill)) {
      setField('skills', [...skills, skill])
    }
    setSearch('')
  }

  function removeSkill(skill: string) {
    setField('skills', skills.filter((s) => s !== skill))
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && search.trim()) {
      e.preventDefault()
      const matched = COMMON_SKILLS.find(
        (s) => s.toLowerCase() === search.trim().toLowerCase()
      )
      addSkill(matched || search.trim())
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label>Your Current Skills</Label>
        <p className="text-xs text-muted-foreground">
          Type to search or press Enter to add a custom skill
        </p>
        <Input
          placeholder="Search skills... (e.g. React, Python, Figma)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-background border-border/60"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addSkill(s)}
              className="px-3 py-1 text-xs rounded-full border border-border/60 bg-background text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Added skills ({skills.length})</Label>
          <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-border/50 bg-background min-h-[60px]">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="gap-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="hover:text-danger transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {skills.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4 border border-dashed border-border/50 rounded-lg">
          No skills added yet. Search above to add your skills.
        </p>
      )}
    </div>
  )
}
