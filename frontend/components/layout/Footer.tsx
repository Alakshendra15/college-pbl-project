import { BrainCircuit } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <BrainCircuit className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">CareerPath AI</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Built for Indian students &amp; freshers &mdash; Find your path, build your future.
        </p>
      </div>
    </footer>
  )
}
