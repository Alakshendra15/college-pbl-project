'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Filters {
  location: string
  type: string
}

interface Props {
  filters: Filters
  onChange: (filters: Filters) => void
}

const LOCATIONS = ['All India', 'Bangalore', 'Mumbai', 'Hyderabad', 'Pune', 'Chennai', 'Delhi', 'Noida', 'Gurugram', 'Kolkata']
const TYPES = ['All Types', 'Full-time', 'Internship', 'Part-time', 'Contract']

export function JobFilters({ filters, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <Select
        value={filters.location}
        onValueChange={(v) => v && onChange({ ...filters, location: v })}
      >
        <SelectTrigger className="w-44 bg-background border-border/60 h-9 text-sm">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {LOCATIONS.map((l) => (
            <SelectItem key={l} value={l}>{l}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.type}
        onValueChange={(v) => v && onChange({ ...filters, type: v })}
      >
        <SelectTrigger className="w-40 bg-background border-border/60 h-9 text-sm">
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {TYPES.map((t) => (
            <SelectItem key={t} value={t}>{t}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
