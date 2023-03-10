import { QueryResult } from 'pg'
import { z } from 'zod/lib'
import {userCreatedSchema, userSchema, userLoginSchema,userWithoutPasswordSchema} from '../schemas/users.schemas'

export type TUserRequest = z.infer<typeof userSchema>
export type TUserLogin = z.infer<typeof userLoginSchema>
export type TUserResponse = z.infer<typeof userWithoutPasswordSchema>
export type TUserWithPassword = z.infer<typeof userCreatedSchema>
export type TUserQueryResponse = QueryResult<TUserWithPassword>