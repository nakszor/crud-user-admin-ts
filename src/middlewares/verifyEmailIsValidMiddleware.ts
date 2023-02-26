import { NextFunction, Request, Response } from 'express'
import { QueryConfig } from 'pg'
import { client } from '../database'
import  AppError  from '../errors/appError'


const verifyEmailIsValidMiddleware = async (req: Request, res:Response, next: NextFunction): Promise<Response | void> => {

    const email: string = req.body.email

    const queryString: string = `
    SELECT
        *
    FROM
        users
    WHERE
        "email" = $1;
`
        const queryConfig: QueryConfig = {
        text: queryString,
        values: [email]
    }

    const queryResult  = await client.query(queryConfig)

    const emailAlreadyExists = queryResult.rowCount

    if(emailAlreadyExists){

        throw new AppError('E-mail already registered', 409)
    }
      
    return next()
}

export default verifyEmailIsValidMiddleware