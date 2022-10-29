import { ExchangeRatesApi } from '../../exchange-rates/exchange-rates-api'

describe('latestRates()', () => {
  it('should return USD rate', async () => {
    const sut = new ExchangeRatesApi('https://api.exchangerate-api.com')
    const response = await sut.latestRates('USD')
    expect(response.base).toBe('USD')
    expect(response.rates['USD']).toBe(1)
  })
})
