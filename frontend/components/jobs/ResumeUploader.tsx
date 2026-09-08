'use client'

import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { Upload, FileText, Loader2, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { api } from '@/lib/api'
import { ParsedResume } from '@/types/jobs'

export function ResumeUploader() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ParsedResume | null>(null)
  const [fileName, setFileName] = useState('')

  async function handleFile(file: File) {
    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File must be under 10MB')
      return
    }

    setFileName(file.name)
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('resume', file)
      const parsed = await api.upload<ParsedResume>('/resume', formData)
      setResult(parsed)
      toast.success(`Extracted ${parsed.skills.length} skills from your resume`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to parse resume')
      setFileName('')
    } finally {
      setLoading(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function clearResult() {
    setResult(null)
    setFileName('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <h3 className="font-semibold text-foreground mb-1">Resume Analyzer</h3>
      <p className="text-xs text-muted-foreground mb-4">Upload your PDF resume to extract skills</p>

      {!result ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-border/60 rounded-lg p-6 text-center cursor-pointer hover:border-primary/40 transition-colors"
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-xs text-muted-foreground">Parsing {fileName}...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">Drop PDF here</p>
              <p className="text-xs text-muted-foreground">or click to browse</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4 text-primary" />
              <span className="truncate max-w-[160px]">{fileName}</span>
            </div>
            <button onClick={clearResult} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          {result.email && (
            <p className="text-xs text-muted-foreground">Email: {result.email}</p>
          )}

          {result.skills.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2">
                Skills found ({result.skills.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {result.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-xs bg-primary/10 text-primary border-primary/20"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {result.education.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Education detected</p>
              {result.education.map((e) => (
                <p key={e} className="text-xs text-foreground capitalize">{e}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
