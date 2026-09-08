'use client'

import { motion } from 'framer-motion'
import { BrainCircuit, Map, TrendingUp, Search, FileText, Target } from 'lucide-react'

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Career Recommendation',
    description:
      'Get a personalized entry-level role recommendation based on your skills, education, and experience — tailored for the Indian tech market.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: TrendingUp,
    title: 'Skill Gap Analysis',
    description:
      'Instantly see which skills you already have, which you partially know, and exactly what you need to learn for your target role.',
    color: 'text-cyan',
    bg: 'bg-cyan/10',
  },
  {
    icon: Map,
    title: 'Personalized Roadmap',
    description:
      'A step-by-step learning plan with real resources — courses, docs, and projects — organized by phase and time estimate.',
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    icon: Search,
    title: 'Real Job Search',
    description:
      'Browse actual job openings from top Indian companies — filtered by your recommended role, location, and experience level.',
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
  {
    icon: FileText,
    title: 'Resume Parser',
    description:
      'Upload your resume and automatically extract your skills. Use them to supercharge your job search and profile completeness.',
    color: 'text-danger',
    bg: 'bg-danger/10',
  },
  {
    icon: Target,
    title: 'India-Focused',
    description:
      'Salary ranges in INR, companies like Infosys, Razorpay, Zomato, and location-aware guidance across all Indian cities and states.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
]

export function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need to launch your career
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From confusion to clarity — one platform for Indian freshers entering the job market.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-6 rounded-xl border border-border/50 bg-card hover:border-border transition-colors"
            >
              <div className={`inline-flex p-2.5 rounded-lg ${feature.bg} mb-4`}>
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
