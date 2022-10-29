import req from 'supertest'
import { createTestApp } from '../../test/common/test-app'

describe('GET /health', () => {
  it('should return status ok', async () => {
    const app = createTestApp()
    const response = await req(app).get('/health')
    expect(response.body).toEqual({ status: 'ok' })
  })
})
