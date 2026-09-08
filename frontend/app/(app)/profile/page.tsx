'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { User, GraduationCap, MapPin, Code2, Briefcase, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/api'
import { useUserStore } from '@/store/user'

interface ProfileResponse {
  id: string
  name: string
  email: string
  profile: {
    age?: number
    education?: string
    state?: string
    city?: string
    skills?: string[]
    experienceType?: string
    projectTitle?: string
    techStack?: string[]
    completed?: boolean
  } | null
}

export default function ProfilePage() {
  const router = useRouter()
  const { setUser } = useUserStore()
  const [profile, setProfile] = useState<ProfileResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get<ProfileResponse>('/user/profile')
      .then((data) => {
        setProfile(data)
        setUser({ id: data.id, name: data.name, email: data.email })
      })
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="p-6 max-w-2xl mx-auto space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    )
  }

  if (!profile) return null

  const p = profile.profile

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push('/onboarding')}
          className="border-border/60 text-muted-foreground"
        >
          Edit Profile
        </Button>
      </div>

      <Card className="bg-card border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name</span>
            <span className="text-foreground font-medium">{profile.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email</span>
            <span className="text-foreground">{profile.email}</span>
          </div>
          {p?.age && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Age</span>
              <span className="text-foreground">{p.age}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {p ? (
        <>
          <Card className="bg-card border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                Education & Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {p.education && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Education</span>
                  <span className="text-foreground capitalize">{p.education}</span>
                </div>
              )}
              {p.state && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="text-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {p.city}, {p.state}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {p.skills && p.skills.length > 0 && (
            <Card className="bg-card border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-primary" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {p.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {p.experienceType === 'practical' && p.projectTitle && (
            <Card className="bg-card border-border/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  Project Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Project</span>
                  <span className="text-foreground">{p.projectTitle}</span>
                </div>
                {p.techStack && p.techStack.length > 0 && (
                  <div>
                    <span className="text-muted-foreground block mb-1.5">Tech Stack</span>
                    <div className="flex flex-wrap gap-1.5">
                      {p.techStack.map((t) => (
                        <Badge key={t} variant="secondary" className="bg-cyan/10 text-cyan border-cyan/20">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {p.experienceType === 'theoretical' && (
            <Card className="bg-card border-border/60">
              <CardContent className="py-4 flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                Experience type: Theoretical (classroom / self-study)
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card className="bg-card border-border/60">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground text-sm mb-4">Profile not set up yet</p>
            <Button onClick={() => router.push('/onboarding')} className="bg-primary hover:bg-primary/90">
              Complete Onboarding
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
