import express from 'express'
import { userWebhook } from '../controller/user.controller'

const router = express.Router()

router.route('/clerk-user-webhook').post(userWebhook)

export default router

