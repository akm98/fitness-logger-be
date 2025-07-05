import { Request, Response } from 'express'
import { WorkoutModel, zodWorkoutSchema } from '../model/workout.model'

const handleError = (res: Response, status: number, message: unknown) => {
  let error = 'An unexpected error occurred'
  if (typeof message === 'string') {
    error = message
  }
  return res.status(status).json({
    success: false,
    error
  })
}

export const getAllWorkouts = async (_: Request, res: Response) => {
  try {
    const workouts = await WorkoutModel.find().sort({ createdAt: -1 })

    res.status(200).json({ data: workouts })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exercises', error })
  }
}

export const createWorkout = async (req: Request, res: Response) => {
  try {
    // Create a new workout in the database
    // const workout = await Workout.create(req.body);

    if (zodWorkoutSchema.safeParse(req.body).success === false) {
      handleError(res, 400, 'Invalid workout data')
      return
    }
    await WorkoutModel.create(req.body)

    res.status(201).json({ message: 'Workout created successfully' })
  } catch (error: unknown) {
    handleError(res, 500, error)
  }
}

