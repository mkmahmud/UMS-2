// getting-started.js
import mongoose = require('mongoose')
import app from './app'
import config from './configure/index'

async function main() {
  try {
    await mongoose.connect(config.SERVER_URL as string)
    console.log('database connected')
    app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}

main()
