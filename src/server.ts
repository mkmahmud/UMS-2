// getting-started.js
import mongoose = require('mongoose')
import app from './app'
import config from './configure/index'
import { Server } from 'http'

process.on('uncaughtException', err => {
  console.log('Uncaught exception is detction ......', err)
  process.exit(1)
})
let server: Server

async function main() {
  // server close

  try {
    await mongoose.connect(config.SERVER_URL as string)
    console.log('database connected')
    server = app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}`)
    })
  } catch (err) {
    console.log(err)
  }

  process.on('unhandledRejection', err => {
    // eslint-disable-next-line no-console
    console.log('unhandel rejection is dected   So we are closing Our service')
    if (server) {
      server.close(() => {
        console.log(err)
        process.exit()
      })
    } else {
      process.exit(1)
    }
  })
}

main()
process.on('SIGTERM', () => {
  console.log('SINGTERM is recived')
  if (server) {
    server.close()
  }
})
