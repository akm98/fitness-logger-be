import express from 'express' 
import { createWorkout, getAllWorkouts } from '../controller/workoutController'

const workoutRouter = express.Router()

workoutRouter.route('/workout/all').get(getAllWorkouts)

workoutRouter.route('/workout/create').post(createWorkout)

workoutRouter.route('/status').get((_, res) => {
  res.status(200).json({ message: 'Server is running' })
})

export default workoutRouter

