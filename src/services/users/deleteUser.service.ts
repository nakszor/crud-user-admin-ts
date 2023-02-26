import { client } from '../../database'
import { Request, Response } from 'express'

const deleteUserService = async (req: Request, res: Response): Promise<void> => {
    
  const userId = req.params.id;
  
  const queryString = `
      UPDATE users 
      SET active = false 
      WHERE id = $1;
    `
   await client.query(queryString, [userId]);

}
export default deleteUserService