import http from 'http'

const request = http.request(
  {
    host: 'localhost',
    port: '8080',
    method: 'GET',
    path: '/health',
    timeout: 10000,
  },
  (res: any) => {
    if (res.statusCode == 200) {
      process.exit(0)
    }

    process.exit(1)
  }
)

request.on('error', (_: any) => {
  process.exit(1)
})

request.end()
