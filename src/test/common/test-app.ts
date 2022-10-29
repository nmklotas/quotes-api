import { create } from '../../app'

export function createTestApp() {
  return create({
    exchangeRateApiUrl: 'https://api.exchangerate-api.com',
  })
}
