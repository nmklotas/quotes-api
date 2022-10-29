import { Request, Response, NextFunction } from 'express'
import { logger } from './logs'

export function apiError(message: string) {
  return { errors: [{ message }] }
}

export function handleUnknownError(err: Error, _req: Request, res: Response, _next: NextFunction) {
  logger.error(err)
  res.status(500).json(apiError('Unknown error'))
}
