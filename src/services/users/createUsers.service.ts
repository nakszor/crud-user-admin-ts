import  format  from 'pg-format'
import { client } from '../../database'
import { TUserQueryResponse, TUserRequest, TUserResponse } from '../../interfaces/user.interfaces'
import { userWithoutPasswordSchema } from '../../schemas/users.schemas'

const createUserService = async (data: TUserRequest): Promise<TUserResponse> => {

    if (!("admin" in data)) {
        data.admin = false;
      }

    const keys = Object.keys(data)
    const values = Object.values(data)

    const queryString = `INSERT INTO 
    users(%I)
    VALUES
        (%L)
    RETURNING *;`

    const queryFormat = format(queryString, keys, values)
    const queryResult: TUserQueryResponse = await client.query(queryFormat)
    const newUser:TUserResponse = userWithoutPasswordSchema.parse(queryResult.rows[0])

    return newUser
}

export default createUserService