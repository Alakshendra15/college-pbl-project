import { JobFilter, JobSearchResult } from '../types/jobs'
import { mockJobs } from '../mock/jobs.mock'

const PAGE_SIZE = 6

export async function searchJobs(params: JobFilter): Promise<JobSearchResult> {
  // Mock implementation — replace with JSearch RapidAPI call:
  //
  // const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(params.q || '')}&location=${params.location || 'India'}&page=${params.page || 1}&num_pages=1&date_posted=month`
  // const res = await fetch(url, {
  //   headers: { 'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!, 'X-RapidAPI-Host': process.env.RAPIDAPI_HOST! },
  // })
  // const data = await res.json()
  // return normalizeJSearchResponse(data)

  let filtered = [...mockJobs]

  if (params.q) {
    const query = params.q.toLowerCase()
    filtered = filtered.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.skills.some((s) => s.toLowerCase().includes(query)) ||
        job.description.toLowerCase().includes(query)
    )
  }

  if (params.location) {
    const loc = params.location.toLowerCase()
    filtered = filtered.filter((job) => job.location.toLowerCase().includes(loc))
  }

  if (params.type) {
    filtered = filtered.filter(
      (job) => job.employmentType.toLowerCase() === params.type!.toLowerCase()
    )
  }

  const total = filtered.length
  const page = params.page || 1
  const limit = params.limit || PAGE_SIZE
  const start = (page - 1) * limit
  const jobs = filtered.slice(start, start + limit)

  return {
    jobs,
    total,
    page,
    hasMore: start + limit < total,
  }
}
