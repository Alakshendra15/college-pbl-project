import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../services/auth.service'

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.cookies?.auth_token

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  try {
    const { userId } = await verifyToken(token)
    req.userId = userId
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
