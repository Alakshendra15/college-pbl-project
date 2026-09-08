'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/api'
import { CareerAnalysisResponse } from '@/types/career'
import { CareerRecommendationCard } from './CareerRecommendationCard'
import { SkillGapChart } from './SkillGapChart'
import { RoadmapTimeline } from './RoadmapTimeline'
import { RelatedRolesGrid } from './RelatedRolesGrid'

export function CareerDashboard() {
  const router = useRouter()
  const [data, setData] = useState<CareerAnalysisResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function loadAnalysis() {
    setLoading(true)
    setError(null)
    try {
      const result = await api.post<CareerAnalysisResponse>('/ai/career-analysis', {})
      setData(result)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load career analysis'
      if (msg.includes('complete onboarding')) {
        router.push('/onboarding')
      } else {
        setError(msg)
        toast.error(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAnalysis()
  }, [])

  if (loading) return <CareerDashboardSkeleton />

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8">
        <AlertCircle className="h-12 w-12 text-danger" />
        <h2 className="text-lg font-semibold text-foreground">Something went wrong</h2>
        <p className="text-muted-foreground text-sm text-center max-w-md">{error}</p>
        <Button onClick={loadAnalysis} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Career Analysis</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {data.cached ? 'Showing saved analysis' : 'Fresh analysis based on your profile'}
          </p>
        </div>
        <Button
          onClick={loadAnalysis}
          variant="outline"
          size="sm"
          className="gap-2 border-border/60 text-muted-foreground"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <CareerRecommendationCard data={data.data} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillGapChart data={data.data} />
        <RelatedRolesGrid data={data.data} />
      </div>

      <RoadmapTimeline data={data.data} />
    </div>
  )
}

function CareerDashboardSkeleton() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-9 w-24" />
      </div>
      <Skeleton className="h-44 rounded-xl" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
      <Skeleton className="h-80 rounded-xl" />
      <div className="flex justify-center gap-2 py-4">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">Analysing your profile...</span>
      </div>
    </div>
  )
}
