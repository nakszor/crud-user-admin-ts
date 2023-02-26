import { NextFunction, Request, Response } from 'express'
import AppError from '../errors/appError'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
   
    let token = req.headers.authorization
    
    if(!token){
        throw new AppError('Missing Bearer Token', 401) 
    }

    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY!,(err, decoded:any)=>{
        if(err){
            throw new AppError(err.message, 401)
        }
        req.user = {
            id: Number(decoded.sub),
            admin: decoded.admin
        }
    })
    return next()
}
export default verifyTokenMiddleware