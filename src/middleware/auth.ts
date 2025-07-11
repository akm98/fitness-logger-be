import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel, User } from '../model/user.model'

export const isUserAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers?.authorization?.split(' ')[1]
  const guestId = req.headers?.['x-guest-id']
  if (!token) {
    req.guestId = guestId as string | undefined
  } else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
      const userId = decoded.userId as string
      const user: User | null = await UserModel.findById(userId)
      if (user) {
        req.user = user // Type assertion to ensure req.user is of type User
      }
    } else {
      return res.status(401).json({ message: 'Invalid token' })
    }
  }
  next()
}

