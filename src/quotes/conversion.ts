import { Rates } from './types'

export function convert(rates: Rates) {
  return (baseAmount: number, quoteCurrency: string) => {
    const rate = rates[quoteCurrency]
    if (!rate) {
      return undefined
    }

    const roundedRate = round(rate)
    return { amount: round(baseAmount * roundedRate), rate: roundedRate }
  }

  function round(number: number) {
    return Number(number.toFixed(3))
  }
}
