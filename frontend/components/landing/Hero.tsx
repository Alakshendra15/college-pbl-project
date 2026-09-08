'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  const router = useRouter()

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 px-4">
      {/* Background glow effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan/5 blur-[80px]" />
      </div>

      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Career Guidance for Indian Students
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
        >
          Chart Your{' '}
          <span className="bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent">
            Career Path
          </span>{' '}
          with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Stop guessing. Enter your skills, education, and experience — get a personalized career
          recommendation, skill gap analysis, and roadmap tailored for the Indian job market.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={() => router.push('/signup')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base gap-2"
          >
            Get Your Career Analysis
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push('/login')}
            className="border-border/60 h-12 text-base text-muted-foreground hover:text-foreground"
          >
            Sign In
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-sm text-muted-foreground"
        >
          Free to use &nbsp;•&nbsp; No credit card required &nbsp;•&nbsp; India-focused
        </motion.p>
      </div>
    </section>
  )
}
