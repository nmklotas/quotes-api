import { Quote } from './types'

export function toQuotesResponse(quote: Quote) {
  return {
    exchangeRate: quote.rate,
    quoteAmount: quote.amount,
  }
}
