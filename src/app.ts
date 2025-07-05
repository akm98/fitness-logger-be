import express, { Express } from 'express'
import cors, { CorsOptions } from 'cors'
// import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import workoutRouter from './router/workoutRouter'
import path from 'path'

const corsOptions: CorsOptions = {
  origin: '*', // or specific origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}

const app: Express = express()

// middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions))

// routes
app.use('/api/v1', workoutRouter)

export default app

