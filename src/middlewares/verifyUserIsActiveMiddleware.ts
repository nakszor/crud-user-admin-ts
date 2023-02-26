import { NextFunction, Request, Response } from 'express'
import { QueryConfig } from 'pg'
import { client } from '../database'
import  AppError  from '../errors/appError'

const verifyUserIsActiveMiddleware = async (req: Request, res:Response, next: NextFunction): Promise<Response | void> => {

    const id: string = req.params.id

    const queryString: string = `
    SELECT
        *
    FROM
        users
    WHERE
        "id" = $1;
`
        const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult  = await client.query(queryConfig)

    const isActive = queryResult.rows[0].active

    if(req.method === 'DELETE' && !isActive){

        throw new AppError('User already inactive', 409)
    }
    if(req.method === 'PUT' && isActive){

        throw new AppError('User already active', 409)
    }
    if(req.method === 'PATCH' && !isActive){

        throw new AppError('Cannot update an inactive user', 409)
    }
    return next()
}
export default verifyUserIsActiveMiddleware