'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BrainCircuit } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const router = useRouter()

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span>CareerPath AI</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => router.push('/login')} className="text-muted-foreground hover:text-foreground">
            Log in
          </Button>
          <Button onClick={() => router.push('/signup')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  )
}
