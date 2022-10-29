import fetch from 'node-fetch'
import * as z from 'zod'

const latestRatesSchema = z.object({
  base: z.string(),
  rates: z.record(z.number()),
})

export class ExchangeRatesApi {
  constructor(private readonly baseUrl: string) {}

  public async latestRates(currency: string) {
    const response = await fetch(`${this.baseUrl}/v4/latest/${currency}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const body = await response.json()
    return latestRatesSchema.parseAsync(body)
  }
}
