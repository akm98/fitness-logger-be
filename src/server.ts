import app from './app'
import config from './config/config'
import databaseService from './service/databaseService'

const server = app.listen(config.PORT)
// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async () => {
  try {
    await databaseService.connect()
    // eslint-disable-next-line no-console
    console.log('🚀 ~ ; ~ connection created')
  } catch (err) {
    server.close((error) => {
      // eslint-disable-next-line no-console
      console.error('Error connecting to the database:', error, err)
      process.exit(1) // Exit the process with failure
    })
  }
})()

