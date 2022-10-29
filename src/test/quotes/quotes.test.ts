import { quotes } from '../../quotes/quotes'

describe('quotes', () => {
  it('should calculate EUR to USD quote for given rate', async () => {
    const rates = () =>
      Promise.resolve({
        USD: 1.08,
      })

    const result = await quotes(rates)(100, 'EUR', 'USD')
    expect(result!.amount).toBe(108)
    expect(result!.rate).toBe(1.08)
  })
  it('should show 3 decimals for amount', async () => {
    const rates = () =>
      Promise.resolve({
        USD: 1.081111,
      })

    const result = await quotes(rates)(1, 'EUR', 'USD')
    expect(result!.amount).toBe(1.081)
  })
  it('should round rate to 3 decimals', async () => {
    const rates = () =>
      Promise.resolve({
        USD: 1.081711,
      })

    const result = await quotes(rates)(1, 'EUR', 'USD')
    expect(result!.rate).toBe(1.082)
  })
})
