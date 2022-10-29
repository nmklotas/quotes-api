import hpp from 'hpp'
import helmet from 'helmet'
import express, { Express, Router } from 'express'
import { healthController } from './health/health-controller'
import { handleUnknownError } from './application/errors'
import { quotesController } from './quotes/quotes-controller'
import { loggingMiddleware } from './application/logs'
import { ExchangeRatesApi } from './exchange-rates/exchange-rates-api'
import { LruCache } from './application/cache'
import { CachedRates } from './exchange-rates/cached-rates'
import { Rates } from './quotes/types'
import { quotes } from './quotes/quotes'
import { LatestRates } from './exchange-rates/latest-rates'

interface Config {
  exchangeRateApiUrl: string
}

export function create({ exchangeRateApiUrl }: Config) {
  const app = express()
  usePipeline(app)(addControllers)
  return app

  function addControllers(app: Express) {
    const router = Router()
    const api = new ExchangeRatesApi(exchangeRateApiUrl)
    const rates = new CachedRates(new LatestRates(api), new LruCache<Rates>({ maxSize: 100 }))
    const quotesFunc = quotes(c => rates.find(c))

    app.use(quotesController(router, quotesFunc))
    app.use(healthController(router))
  }

  function usePipeline(app: Express) {
    return (routes: (app: Express) => void) => {
      app.use(
        helmet({
          contentSecurityPolicy: false,
        })
      )
      app.use(hpp())
      app.use(loggingMiddleware)
      app.use(express.urlencoded({ extended: true }))
      app.use(express.json())
      routes(app)
      app.use(handleUnknownError)
    }
  }
}
