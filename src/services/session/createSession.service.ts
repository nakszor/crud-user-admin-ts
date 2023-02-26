import { compare } from 'bcryptjs'
import { client } from '../../database'
import { TUserQueryResponse } from '../../interfaces/user.interfaces'
import AppError from '../../errors/appError'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const loginService = async (email: string, password: string) => {
    
    const queryString: string = `
      SELECT 
        *
      FROM 
        users
      WHERE
        email = $1
    `;
    const queryResult: TUserQueryResponse = await client.query(queryString, [email]);
    
    const user = queryResult.rows[0];

    if (!user) {

      throw new AppError('Wrong email or password', 401);
    }
  
    const matchPassword: boolean = await compare(password, user.password);
    
    if (!matchPassword) {
      
      throw new AppError('Wrong  password', 401);
    }
  
    const token: string = jwt.sign(
      {
        admin: user.admin,
      },
      process.env.SECRET_KEY!,
      {
        subject: user.id.toString(),
        expiresIn: '1h',
      }
    );
  
    return { token };
  }
  
  export default loginService;
  