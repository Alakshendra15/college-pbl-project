'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BrainCircuit, LayoutDashboard, Briefcase, User, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { api } from '@/lib/api'
import { useUserStore } from '@/store/user'
import { toast } from 'sonner'

const navItems = [
  { href: '/dashboard/career', label: 'Career Analysis', icon: LayoutDashboard },
  { href: '/dashboard/jobs', label: 'Job Search', icon: Briefcase },
  { href: '/profile', label: 'My Profile', icon: User },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, setUser } = useUserStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    try {
      await api.post('/auth/logout', {})
      setUser(null)
      router.push('/login')
    } catch {
      toast.error('Logout failed')
    }
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border/50">
        <Link href="/dashboard/career" className="flex items-center gap-2 font-bold text-lg">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="text-foreground">CareerPath AI</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-card'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border/50">
        {user && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          'md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border/50 transform transition-transform duration-200',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-1 rounded text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col bg-surface border-r border-border/50">
        <SidebarContent />
      </aside>
    </>
  )
}
