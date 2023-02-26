
import { Request, Response } from 'express'
import { client } from '../../database'
import { TUserQueryResponse,  TUserResponse } from '../../interfaces/user.interfaces'
import { userWithoutPasswordSchema } from '../../schemas/users.schemas'

const retrieveUserService = async (req: Request, res:Response): Promise<TUserResponse> => {
   
    const user = req.user

    const queryString:string  = `
    SELECT
     * 
    FROM
     users
    WHERE 
     id = $1;`
     
    const queryResult: TUserQueryResponse = await client.query(queryString, [user.id])

    const profile:TUserResponse = userWithoutPasswordSchema.parse(queryResult.rows[0])

    return profile
}

export default retrieveUserService