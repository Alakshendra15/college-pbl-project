import { Router, Request, Response } from 'express'
import multer from 'multer'
import { requireAuth } from '../middleware/auth'
import { parseResume } from '../services/resume.service'

const router = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Only PDF files are accepted'))
    }
  },
})

router.post(
  '/',
  requireAuth,
  upload.single('resume'),
  async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      res.status(400).json({ error: 'No PDF file uploaded' })
      return
    }

    const parsed = await parseResume(req.file.buffer)
    res.json(parsed)
  }
)

export default router
