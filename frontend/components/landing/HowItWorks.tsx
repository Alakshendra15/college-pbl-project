'use client'

import { motion } from 'framer-motion'
import { UserPlus, ClipboardList, BrainCircuit, Rocket } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Create Your Account',
    description: 'Sign up with your name, email, and password in under a minute.',
  },
  {
    step: '02',
    icon: ClipboardList,
    title: 'Fill Your Profile',
    description:
      'Tell us your education, location, skills, and whether you have project experience.',
  },
  {
    step: '03',
    icon: BrainCircuit,
    title: 'Get AI Analysis',
    description:
      'Our AI analyses your profile and recommends the best entry-level career path with a detailed roadmap.',
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Find & Apply to Jobs',
    description:
      'Search real job openings matching your recommended role, upload your resume, and start applying.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-surface/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-muted-foreground text-lg">Four simple steps to your career clarity.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-4">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
