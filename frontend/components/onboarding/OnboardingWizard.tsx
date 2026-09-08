'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { ArrowLeft, ArrowRight, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { api } from '@/lib/api'
import { useOnboardingStore } from '@/store/onboarding'
import { Step1PersonalInfo } from './steps/Step1PersonalInfo'
import { Step2Education } from './steps/Step2Education'
import { Step3Location } from './steps/Step3Location'
import { Step4Skills } from './steps/Step4Skills'
import { Step5Experience } from './steps/Step5Experience'
import { Step6Projects } from './steps/Step6Projects'

const stepMeta = [
  { title: 'Personal Info', subtitle: 'Tell us a bit about yourself' },
  { title: 'Education', subtitle: 'What level are you studying at?' },
  { title: 'Location', subtitle: 'Where are you based in India?' },
  { title: 'Your Skills', subtitle: 'What technologies and tools do you know?' },
  { title: 'Experience Type', subtitle: 'How have you built your knowledge?' },
  { title: 'Your Projects', subtitle: 'Tell us about a project you\'ve built' },
]

const TOTAL_STEPS = 6

export function OnboardingWizard({ userName }: { userName?: string }) {
  const router = useRouter()
  const store = useOnboardingStore()
  const [loading, setLoading] = useState(false)

  // Pre-fill name from auth if available
  if (userName && !store.name) {
    store.setField('name', userName)
  }

  const currentStep = store.step
  const progress = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100

  function validateCurrentStep(): string | null {
    switch (currentStep) {
      case 1:
        if (!store.name.trim()) return 'Please enter your name'
        if (!store.age || parseInt(store.age) < 15 || parseInt(store.age) > 60)
          return 'Please enter a valid age (15–60)'
        return null
      case 2:
        if (!store.education) return 'Please select your education level'
        return null
      case 3:
        if (!store.state) return 'Please select your state'
        if (!store.city) return 'Please select your city'
        return null
      case 4:
        if (store.skills.length === 0) return 'Please add at least one skill'
        return null
      case 5:
        if (!store.experienceType) return 'Please select your experience type'
        return null
      case 6:
        if (store.experienceType === 'practical') {
          if (!store.projectTitle.trim()) return 'Please enter your project title'
          if (store.techStack.length === 0) return 'Please add at least one technology'
        }
        return null
      default:
        return null
    }
  }

  function handleNext() {
    const error = validateCurrentStep()
    if (error) {
      toast.error(error)
      return
    }
    // Skip step 6 if theoretical
    if (currentStep === 5 && store.experienceType === 'theoretical') {
      handleSubmit()
      return
    }
    if (currentStep < TOTAL_STEPS) {
      store.setStep(currentStep + 1)
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      // Skip step 6 backwards if theoretical
      if (currentStep === 6 && store.experienceType === 'theoretical') {
        store.setStep(4)
      } else {
        store.setStep(currentStep - 1)
      }
    }
  }

  async function handleSubmit() {
    setLoading(true)
    try {
      await api.post('/user/onboarding', {
        name: store.name,
        age: parseInt(store.age),
        education: store.education,
        state: store.state,
        city: store.city,
        skills: store.skills,
        experienceType: store.experienceType,
        projectTitle: store.experienceType === 'practical' ? store.projectTitle : undefined,
        techStack: store.experienceType === 'practical' ? store.techStack : undefined,
      })
      store.reset()
      router.push('/dashboard/career')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save profile')
      setLoading(false)
    }
  }

  const meta = stepMeta[currentStep - 1]
  const isLastStep = currentStep === TOTAL_STEPS || (currentStep === 5 && store.experienceType === 'theoretical')

  const stepComponents: Record<number, React.ReactNode> = {
    1: <Step1PersonalInfo />,
    2: <Step2Education />,
    3: <Step3Location />,
    4: <Step4Skills />,
    5: <Step5Experience />,
    6: <Step6Projects />,
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground mb-1">
            Step {currentStep} of {store.experienceType === 'theoretical' && currentStep >= 5 ? 5 : TOTAL_STEPS}
          </p>
          <h1 className="text-2xl font-bold text-foreground">{meta.title}</h1>
          <p className="text-muted-foreground mt-1">{meta.subtitle}</p>
        </div>

        {/* Progress */}
        <Progress value={progress} className="mb-8 h-1.5" />

        {/* Step content */}
        <div className="bg-card border border-border/60 rounded-xl p-6 mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {stepComponents[currentStep]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={loading}
              className="flex-1 border-border/60"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <Button
            onClick={isLastStep ? handleSubmit : handleNext}
            disabled={loading}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isLastStep ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Finish & Get Analysis
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
