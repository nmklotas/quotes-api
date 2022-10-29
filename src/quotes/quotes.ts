import { convert } from './conversion'
import { RatesFunc } from './types'

export function quotes(rates: RatesFunc) {
  return async (baseAmount: number, baseCurrency: string, quoteCurrency: string) => {
    const baseRates = await rates(baseCurrency)
    return convert(baseRates)(baseAmount, quoteCurrency)
  }
}
