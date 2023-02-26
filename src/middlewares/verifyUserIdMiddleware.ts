import { NextFunction, Request, Response } from 'express'
import  AppError  from '../errors/appError'

const verifyUserIdMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
   
  const userId = req.params.id
  
  const currentUser = req.user
  
  if (currentUser.id !== Number(userId)) {
      
    if (!currentUser.admin) {
        
      throw new AppError('Insufficient Permission', 403)

    }
  }
  
    return next()
    
}
export default verifyUserIdMiddleware