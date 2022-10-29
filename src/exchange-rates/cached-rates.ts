import { LruCache } from '../application/cache'
import { LatestRates } from './latest-rates'
import { Rates } from '../quotes/types'

export class CachedRates {
  constructor(private readonly latestRates: LatestRates, private readonly cache: LruCache<Rates>) {}

  public async find(baseCurrency: string) {
    const rates = this.cache.get(key(baseCurrency))
    if (rates) {
      return rates
    }

    const latest = await this.latestRates.find(baseCurrency)
    this.cache.set(key(baseCurrency), latest)
    return latest
  }
}

function key(baseCurrency: string) {
  return `rates-${baseCurrency}`
}
