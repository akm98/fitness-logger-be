import mongoose from 'mongoose'
import config from '../config/config'

export default {
  connect: async () => {
    try {
      // Simulate database connection
      await mongoose.connect(config.DATABASE_URL ?? '')
      return mongoose.connection
    } catch (error) {
      throw error
    }
  }
}
