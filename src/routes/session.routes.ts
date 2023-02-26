import { Router } from 'express'
import { loginController } from '../controllers/session.controller'
import { verifyDataIsValidMiddleware }  from '../middlewares/'
import { userLoginSchema } from '../schemas/users.schemas'

const sessionRouter = Router()

sessionRouter.post('', verifyDataIsValidMiddleware(userLoginSchema),loginController)

export default sessionRouter