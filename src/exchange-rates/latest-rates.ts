import { ExchangeRatesApi } from './exchange-rates-api'

export class LatestRates {
  constructor(private readonly api: ExchangeRatesApi) {}

  public async find(baseCurrency: string) {
    const { rates } = await this.api.latestRates(baseCurrency)
    return rates
  }
}
