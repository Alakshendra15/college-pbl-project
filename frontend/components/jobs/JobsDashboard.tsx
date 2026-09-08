'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { toast } from 'sonner'
import { Loader2, SearchX } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/api'
import { Job, JobSearchResult } from '@/types/jobs'
import { JobSearchBar } from './JobSearchBar'
import { JobFilters } from './JobFilters'
import { JobCard } from './JobCard'
import { ResumeUploader } from './ResumeUploader'

const DEFAULT_FILTERS = { location: 'All India', type: 'All Types' }

export function JobsDashboard() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [jobs, setJobs] = useState<Job[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const isFirstLoad = useRef(true)

  const { ref: loadMoreRef, inView } = useInView({ threshold: 0.5 })

  const fetchJobs = useCallback(async (q: string, f: typeof DEFAULT_FILTERS, p: number, append: boolean) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (q) params.set('q', q)
      if (f.location !== 'All India') params.set('location', f.location)
      if (f.type !== 'All Types') params.set('type', f.type)
      params.set('page', String(p))

      const result = await api.get<JobSearchResult>(`/jobs?${params}`)
      setJobs((prev) => (append ? [...prev, ...result.jobs] : result.jobs))
      setHasMore(result.hasMore)
      setTotal(result.total)
      setPage(p)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to load jobs')
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }, [])

  // Initial load
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      fetchJobs('', DEFAULT_FILTERS, 1, false)
    }
  }, [fetchJobs])

  // Infinite scroll
  useEffect(() => {
    if (inView && hasMore && !loading && !initialLoading) {
      fetchJobs(query, filters, page + 1, true)
    }
  }, [inView])

  function handleSearch() {
    fetchJobs(query, filters, 1, false)
  }

  function handleFilterChange(f: typeof DEFAULT_FILTERS) {
    setFilters(f)
    fetchJobs(query, f, 1, false)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Job Search</h1>
        <p className="text-sm text-muted-foreground">
          {total > 0 ? `${total} jobs found` : 'Find your perfect job'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-72 shrink-0">
          <ResumeUploader />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="space-y-3 mb-6">
            <JobSearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
            <JobFilters filters={filters} onChange={handleFilterChange} />
          </div>

          {initialLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-52 rounded-xl" />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
              <SearchX className="h-12 w-12 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">No jobs found</h3>
              <p className="text-sm text-muted-foreground">Try a different search query or filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              {/* Infinite scroll trigger */}
              <div ref={loadMoreRef} className="py-6 flex justify-center">
                {loading && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
                {!hasMore && jobs.length > 0 && (
                  <p className="text-sm text-muted-foreground">All jobs loaded</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
