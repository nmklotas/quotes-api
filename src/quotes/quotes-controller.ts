import { Router } from 'express'
import { parseRequest } from '../application/validation'
import { toQuotesResponse } from './response'
import { schema } from './schema'
import { QuoteFunc } from './types'
import { ok, badRequest, notFound } from '../application/responses'

export function quotesController(router: Router, quote: QuoteFunc) {
  router.get('/quotes', async (req, res) => {
    const parseResult = await parseRequest(schema, req)
    if (!parseResult.success) {
      return badRequest(res, parseResult.error.message)
    }

    const { baseAmount, baseCurrency, quoteCurrency } = parseResult.data.query

    const result = await quote(baseAmount, baseCurrency, quoteCurrency)
    if (!result) {
      return notFound(res)
    }

    return ok(res, toQuotesResponse(result))
  })
  return router
}
