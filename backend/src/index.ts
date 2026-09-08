import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { errorHandler } from './middleware/errorHandler'
import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import aiRoutes from './routes/ai'
import jobsRoutes from './routes/jobs'
import resumeRoutes from './routes/resume'

import './types/user' // augment Express Request

const app = express()
const PORT = parseInt(process.env.PORT || '4000', 10)
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

const isDev = process.env.NODE_ENV !== 'production'

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (isDev && /^http:\/\/localhost:\d+$/.test(origin)) return callback(null, true)
      if (origin === FRONTEND_URL) return callback(null, true)
      callback(new Error(`CORS: ${origin} not allowed`))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/ai', aiRoutes)
app.use('/jobs', jobsRoutes)
app.use('/resume', resumeRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
