import mongoose, { models } from 'mongoose'
import z from 'zod'
import { ObjectId } from 'mongodb'

export const zodWorkoutSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  date: z.string().datetime(),
  bodyPart: z.string(),
  user: z.string(),
  exercises: z.array(
    z.object({
      name: z.string(),
      weightMetric: z.enum(['kg', 'lbs']),
      sets: z.number().min(1),
      setDetails: z.array(
        z.object({
          setNumber: z.number().min(1),
          weight: z.number().positive(),
          reps: z.number().min(1)
        })
      )
    })
  )
})

export type Exercise = z.infer<typeof zodWorkoutSchema>

const setDetailSchema = new mongoose.Schema(
  {
    setNumber: { type: Number, required: true, min: 1 },
    weight: { type: Number, required: true, min: 0 }, // positive
    reps: { type: Number, required: true, min: 1 }
  },
  { _id: false }
)

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    weightMetric: { type: String, enum: ['kg', 'lbs'], required: true },
    sets: { type: Number, required: true, min: 1 },
    setDetails: { type: [setDetailSchema], required: true }
  },
  { _id: false }
)

const workoutSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    bodyPart: { type: String, required: true },
    exercises: { type: [exerciseSchema], required: true },
    user: { type: String, required: true }
  }
)

export const WorkoutModel = models.Workout || mongoose.model('Workout', workoutSchema)

