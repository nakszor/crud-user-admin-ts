import { hashSync } from 'bcryptjs'
import { z } from 'zod'

export const userSchema = z.object({
    name: z.string().max(50),
    email: z.string().max(50).email(),
    password: z.string().max(250).transform(pass => hashSync(pass,10)),
    admin: z.boolean().optional()
})
export const userCreatedSchema = userSchema.extend({
    id: z.number(),
    admin: z.boolean(),
    active: z.boolean()
})
export const userLoginSchema = z.object({
    email: z.string().max(50).email(),
    password: z.string().max(250)
}) 
export const userUpdateSchema = z.object({
      name: z.string().max(50).optional(),
      email: z.string().max(50).email().optional(),
      password: z.string().max(250).transform(pass => hashSync(pass,10)).optional(),
})
export const userWithoutPasswordSchema = userCreatedSchema.omit({password: true})
export const userListSchema = z.array(userWithoutPasswordSchema)