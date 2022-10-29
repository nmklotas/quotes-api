export interface Quote {
  amount: number
  rate: number
}

export type Rates = Record<string, number>

export type RatesFunc = (quoteCurrency: string) => Promise<Rates>

export type QuoteFunc = (
  baseAmount: number,
  baseCurrency: string,
  quoteCurrency: string
) => Promise<Quote | undefined>
