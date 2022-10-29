import morgan from 'morgan'
import { createLogger, format, transports } from 'winston'

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [new transports.Console()],
})

export const loggingMiddleware = morgan(
  ':remote-addr - :remote-user [:date[clf]] ":method :url" :status :res[content-length] ":referrer" :response-time ms'
)
