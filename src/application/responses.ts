import { Response } from 'express'
import { apiError } from './errors'

export function ok(res: Response, result: unknown) {
  return res.status(200).json(result)
}

export function notFound(res: Response) {
  return res.status(404).json(apiError('Not found'))
}

export function badRequest(res: Response, message: string) {
  return res.status(400).json(apiError(message))
}
