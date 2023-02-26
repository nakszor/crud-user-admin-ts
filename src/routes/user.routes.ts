import { Request, Response, Router } from 'express'
import { createUserController,
         listUserController, 
         retrieveUserController,
         updateUserController } from '../controllers/users.controllers'
import { verifyDataIsValidMiddleware, 
         verifyEmailIsValidMiddleware,
         verifyTokenIsValidMiddleware,
         verifyUserIdMiddleware }  from '../middlewares/'
import { userSchema, userUpdateSchema } from '../schemas/users.schemas'


const userRouter = Router()

userRouter.get('', verifyTokenIsValidMiddleware, listUserController)
userRouter.get('/profile', verifyTokenIsValidMiddleware, retrieveUserController)
userRouter.post('', verifyDataIsValidMiddleware(userSchema), verifyEmailIsValidMiddleware, createUserController)
userRouter.patch('/:id',verifyDataIsValidMiddleware(userUpdateSchema), verifyTokenIsValidMiddleware, verifyUserIdMiddleware, updateUserController)
export default userRouter