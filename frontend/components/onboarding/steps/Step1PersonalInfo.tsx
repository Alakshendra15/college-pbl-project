'use client'

import { useOnboardingStore } from '@/store/onboarding'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export function Step1PersonalInfo() {
  const { name, age, setField } = useOnboardingStore()

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Rahul Sharma"
          value={name}
          onChange={(e) => setField('name', e.target.value)}
          className="bg-background border-border/60"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          placeholder="21"
          min={15}
          max={60}
          value={age}
          onChange={(e) => setField('age', e.target.value)}
          className="bg-background border-border/60"
        />
      </div>
    </div>
  )
}
