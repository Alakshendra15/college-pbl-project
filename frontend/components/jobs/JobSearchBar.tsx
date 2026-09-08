'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Props {
  value: string
  onChange: (v: string) => void
  onSearch: () => void
}

export function JobSearchBar({ value, onChange, onSearch }: Props) {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search jobs, companies, skills..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          className="pl-10 bg-background border-border/60 h-11"
        />
      </div>
      <Button onClick={onSearch} className="bg-primary hover:bg-primary/90 h-11 px-6">
        Search
      </Button>
    </div>
  )
}
