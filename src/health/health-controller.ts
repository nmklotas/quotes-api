import { ok } from '../application/responses'
import { Router } from 'express'

export function healthController(router: Router) {
  router.get('/health', (_, res) => ok(res, { status: 'ok' }))
  return router
}
