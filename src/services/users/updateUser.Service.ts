import { client } from '../../database'
import { Request, Response } from 'express'
import { TUserQueryResponse, TUserResponse } from '../../interfaces/user.interfaces'
import { userWithoutPasswordSchema } from '../../schemas/users.schemas'

const updateUserService = async (req: Request): Promise<TUserResponse> => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  let queryString = 'UPDATE users SET ';
  let values: Array<string | number> = [];
  let valueIndex = 1;

  if (name) {
    queryString += `name = $${valueIndex}, `;
    values.push(name);
    valueIndex++;
  }

  if (email) {
    queryString += `email = $${valueIndex}, `;
    values.push(email);
    valueIndex++;
  }

  if (password) {
    queryString += `password = $${valueIndex}, `;
    values.push(password);
    valueIndex++;
  }

  queryString = queryString.slice(0, -2);

  queryString += ` WHERE id = $${valueIndex} RETURNING *;`;
  values.push(id);

  const result = await client.query(queryString, values);

  if (result.rowCount === 0) {
    throw new Error('User not found');
  }

  const updatedUserData = result.rows[0];

  const updatedUserResponse: TUserResponse = userWithoutPasswordSchema.parse(updatedUserData);

  return updatedUserResponse;
};


export default updateUserService;
  