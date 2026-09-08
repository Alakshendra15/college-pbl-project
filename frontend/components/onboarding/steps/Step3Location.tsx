'use client'

import { useState } from 'react'
import { useOnboardingStore } from '@/store/onboarding'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MapPin, ChevronRight } from 'lucide-react'
import { ALL_STATES, getCitiesForState } from '@/constants/india-locations'

export function Step3Location() {
  const { state, city, setField } = useOnboardingStore()
  const [cityDialogOpen, setCityDialogOpen] = useState(false)
  const [citySearch, setCitySearch] = useState('')

  const cities = getCitiesForState(state)
  const filteredCities = cities.filter((c) =>
    c.toLowerCase().includes(citySearch.toLowerCase())
  )

  function handleStateChange(val: string | null) {
    if (!val) return
    setField('state', val)
    setField('city', '')
  }

  function selectCity(c: string) {
    setField('city', c)
    setCityDialogOpen(false)
    setCitySearch('')
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label>State</Label>
        <Select value={state} onValueChange={(v) => handleStateChange(v)}>
          <SelectTrigger className="bg-background border-border/60">
            <SelectValue placeholder="Select your state" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border max-h-72">
            {ALL_STATES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label>City</Label>
        <Button
          type="button"
          variant="outline"
          disabled={!state}
          onClick={() => setCityDialogOpen(true)}
          className="w-full justify-between bg-background border-border/60 font-normal"
        >
          <span className={city ? 'text-foreground' : 'text-muted-foreground'}>
            {city || (state ? 'Select your city' : 'Select a state first')}
          </span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
          </div>
        </Button>
      </div>

      <Dialog open={cityDialogOpen} onOpenChange={setCityDialogOpen}>
        <DialogContent className="bg-card border-border max-w-sm">
          <DialogHeader>
            <DialogTitle>Select City — {state}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Search city..."
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              className="bg-background border-border/60"
              autoFocus
            />
            <div className="max-h-64 overflow-y-auto space-y-1">
              {filteredCities.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No cities found</p>
              ) : (
                filteredCities.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => selectCity(c)}
                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
                  >
                    {c}
                  </button>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
