import mongoose, { models } from 'mongoose'
import z from 'zod'
import { ObjectId } from 'mongodb'

export const zodUserSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
  createdAt: z.date()
})
export type User = z.infer<typeof zodUserSchema>

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, minlength: 3, maxlength: 20, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

export const UserModel = models.User || mongoose.model('User', userSchema)
export const validateUser = (user: unknown): user is User => {
  return zodUserSchema.safeParse(user).success
}

