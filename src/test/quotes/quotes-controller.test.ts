import req from 'supertest'
import { createTestApp } from '../../test/common/test-app'

describe('/quotes', () => {
  it('should return USD to USD quote', async () => {
    const app = createTestApp()
    const response = await req(app)
      .get('/quotes?baseAmount=1&baseCurrency=USD&quoteCurrency=USD')
      .send()
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({ exchangeRate: 1, quoteAmount: 1 })
  })
  it('should return EUR to USD quote', async () => {
    const app = createTestApp()
    const response = await req(app)
      .get('/quotes?baseAmount=1&baseCurrency=EUR&quoteCurrency=USD')
      .send()
    console.log(`1 EUR to USD quote. ${JSON.stringify(response.body)}`)
    expect(response.status).toEqual(200)
    expect(response.body.quoteAmount).not.toEqual(1)
    expect(response.body.exchangeRate).not.toEqual(1)
  })
  it('should return USD to EUR quote', async () => {
    const app = createTestApp()
    const response = await req(app)
      .get('/quotes?baseAmount=1&baseCurrency=USD&quoteCurrency=EUR')
      .send()
    console.log(`1 USD to EUR quote. ${JSON.stringify(response.body)}`)
    expect(response.status).toEqual(200)
    expect(response.body.quoteAmount).not.toEqual(1)
    expect(response.body.exchangeRate).not.toEqual(1)
  })
  it('should return bad request for unknown quote currency', async () => {
    const app = createTestApp()
    const response = await req(app)
      .get('/quotes?baseAmount=1&baseCurrency=USD&quoteCurrency=XXX')
      .send()
    expect(response.status).toEqual(400)
  })
  it('should return not found for not existing url', async () => {
    const app = createTestApp()
    const response = await req(app).get('/quotez').send()
    expect(response.status).toEqual(404)
  })
  it('should return bad request for missing baseCurrency', async () => {
    const app = createTestApp()
    const response = await req(app).get('/quotes?baseAmount=1&baseCurrency=USD').send()
    expect(response.status).toEqual(400)
  })
  it('should return bad request for invalid baseCurrency', async () => {
    const app = createTestApp()
    const response = await req(app)
      .get('/quotes?baseAmount=1&baseCurrency=USDD&quoteCurrency=USD')
      .send()
    expect(response.status).toEqual(400)
  })
})
