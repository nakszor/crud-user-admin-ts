import { client } from '../../database'
import { Request, Response } from 'express'
import { TUserQueryResponse, TUserResponse } from '../../interfaces/user.interfaces'
import { userWithoutPasswordSchema } from '../../schemas/users.schemas'

const updateUserService = async (req: Request, res: Response): Promise<TUserResponse> => {
  
  const newData = req.body;
  const userId = req.params.id;

  const existingUserQueryResult = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
  const existingUser = existingUserQueryResult.rows[0];

  if (!existingUser) {
    throw new Error('User not found');
  }

  const updatedUser = {
    ...existingUser,
    ...newData
  };

  const keys = Object.keys(updatedUser);
  const values = Object.values(updatedUser);

  const setFields = keys.slice(1).map((key, index) => `${key} = $${index + 1}`).join(', ');

  const queryString = `
    UPDATE users
    SET ${setFields}
    WHERE id = $${keys.length}
    RETURNING *;
  `;
  const queryResult: TUserQueryResponse = await client.query(queryString, values.slice(1).concat(userId));

  const updatedUserData = queryResult.rows[0];

  const updatedUserResponse = userWithoutPasswordSchema.parse(updatedUserData);

  return updatedUserResponse;
};

export default updateUserService;
  