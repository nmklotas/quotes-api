import { schema } from '../../quotes/schema'

describe('schema', () => {
  it('should succeed if baseAmount is integer', async () => {
    const result = await schema.safeParseAsync({
      query: {
        baseAmount: '100',
        baseCurrency: 'USD',
        quoteCurrency: 'USD',
      },
    })
    expect(result.success).toBeTruthy()
  })
  it('should fail if baseAmount is not integer', async () => {
    const result = await schema.safeParseAsync({
      query: {
        baseAmount: '1.1',
        baseCurrency: 'USD',
        quoteCurrency: 'USD',
      },
    })
    expect(result.success).toBeFalsy()
  })
})
