import { Router } from 'express'
import sessionRouter from './session.routes'
import userRouter from './user.routes'

const router = Router()

router.use('/users', userRouter)
router.use('/login', sessionRouter)

export default router
