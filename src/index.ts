import { create } from './app'
import { logger } from './application/logs'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

if (!process.env.EXCHANGE_RATE_API_URL) {
  throw new Error('EXCHANGE_RATE_API_URL is required')
}

if (!process.env.PORT) {
  throw new Error('PORT is required')
}

const app = create({
  exchangeRateApiUrl: process.env.EXCHANGE_RATE_API_URL,
})
app.listen(process.env.PORT, () => {
  logger.info('App running on port %d in %s', process.env.PORT, process.env.NODE_ENV)
})
