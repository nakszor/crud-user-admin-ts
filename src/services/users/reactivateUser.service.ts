import { client } from '../../database'
import { Request, Response } from 'express'
import {  TUserResponse } from '../../interfaces/user.interfaces'
import { userWithoutPasswordSchema } from '../../schemas/users.schemas'

const reactivateUserService = async (req: Request, res: Response): Promise<TUserResponse> => {
   
  const { id } = req.params;
    
  const queryString = `
  UPDATE users 
  SET active = true 
  WHERE id = $1
  RETURNING *;`
    
  const queryResult = await client.query(queryString, [id])

  const profile:TUserResponse = userWithoutPasswordSchema.parse(queryResult.rows[0])

  return profile

}  
export default reactivateUserService