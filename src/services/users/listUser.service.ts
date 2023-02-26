import { client } from '../../database'
import { TUserQueryResponse,  TUserResponse } from '../../interfaces/user.interfaces'
import { userWithoutPasswordSchema } from '../../schemas/users.schemas'

const listUserService = async (): Promise<TUserResponse[]> => {
   
    const queryString:string  = `
    SELECT
     * 
    FROM
     users;`
     
    const queryResult: TUserQueryResponse = await client.query(queryString)

    const users:TUserResponse[] = queryResult.rows.map((row) => {
       
      return userWithoutPasswordSchema.parse(row);
      
    });      

    return users
}

export default listUserService