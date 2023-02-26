import { Request, Response, NextFunction } from 'express'
import AppError from '../errors/appError'

const verifyAdminPermissionMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
    
    if (req.user && req.user.admin) {

        return next()
    } 
    
    else {

        throw new AppError('Insufficient permission', 403)
    }
}
export default verifyAdminPermissionMiddleware;
