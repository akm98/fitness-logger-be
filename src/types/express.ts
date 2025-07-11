// types/express/index.d.ts
import { User } from '../model/user.model'

declare module 'express-serve-static-core' {
  interface Request {
    user?: User // or `any` if no type
    guestId?: string
  }
}

