'use client'

import { useOnboardingStore } from '@/store/onboarding'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

const options = [
  { value: 'undergraduate', label: 'Undergraduate', desc: 'Currently pursuing or completed B.Tech, B.Sc, BCA, B.E., etc.' },
  { value: 'graduate', label: 'Graduate', desc: 'Completed a bachelor\'s degree' },
  { value: 'postgraduate', label: 'Postgraduate', desc: 'Completed or pursuing M.Tech, M.Sc, MBA, MCA, etc.' },
] as const

export function Step2Education() {
  const { education, setField } = useOnboardingStore()

  return (
    <div className="space-y-3">
      <Label>Education Level</Label>
      <RadioGroup
        value={education}
        onValueChange={(val) => setField('education', val as typeof education)}
        className="space-y-3"
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            htmlFor={opt.value}
            className={cn(
              'flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors',
              education === opt.value
                ? 'border-primary bg-primary/5'
                : 'border-border/60 bg-background hover:border-border'
            )}
          >
            <RadioGroupItem value={opt.value} id={opt.value} className="mt-0.5" />
            <div>
              <p className="font-medium text-foreground">{opt.label}</p>
              <p className="text-sm text-muted-foreground">{opt.desc}</p>
            </div>
          </label>
        ))}
      </RadioGroup>
    </div>
  )
}
