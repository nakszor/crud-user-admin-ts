import { Router } from 'express'
import { createUserController,
         listUserController, 
         retrieveUserController,
         updateUserController,
         deleteUserController,
         reactivateUserController } from '../controllers/users.controllers'
import { verifyDataIsValidMiddleware, 
         verifyEmailIsValidMiddleware,
         verifyTokenIsValidMiddleware,
         verifyUserIdMiddleware,
         verifyAdminPermissionMiddleware,
         verifyUserIsActiveMiddleware }  from '../middlewares/'
import { userSchema, userUpdateSchema } from '../schemas/users.schemas'

const userRouter = Router()

userRouter.get('', verifyTokenIsValidMiddleware, verifyAdminPermissionMiddleware,listUserController)
userRouter.get('/profile', verifyTokenIsValidMiddleware, retrieveUserController)
userRouter.post('', verifyDataIsValidMiddleware(userSchema), verifyEmailIsValidMiddleware, createUserController)
userRouter.patch('/:id',verifyDataIsValidMiddleware(userUpdateSchema), verifyEmailIsValidMiddleware,verifyTokenIsValidMiddleware, verifyUserIdMiddleware, updateUserController)
userRouter.delete('/:id', verifyTokenIsValidMiddleware, verifyUserIdMiddleware, verifyUserIsActiveMiddleware,deleteUserController)
userRouter.put('/:id/recover', verifyTokenIsValidMiddleware,verifyAdminPermissionMiddleware, verifyUserIsActiveMiddleware, reactivateUserController)

export default userRouter