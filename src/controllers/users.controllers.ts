import { Request, Response } from 'express'
import createUserService from '../services/users/createUsers.service'
import listUserService from '../services/users/listUser.service'
import retrieveUserService from '../services/users/retrieveUser.service'
import updateUserService from '../services/users/updateUser.Service'

export const createUserController = async (req: Request, res: Response):Promise<Response> =>{
    const data = await createUserService(req.body)
    return res.status(201).json(data)
}
export const listUserController = async (req: Request, res: Response):Promise<Response> =>{
    const data = await listUserService()
    return res.status(200).json(data)
}
export const retrieveUserController = async (req: Request, res: Response):Promise<Response> =>{
    const data = await retrieveUserService(req, res)
    return res.status(200).json(data)
}
export const updateUserController = async (req: Request, res: Response):Promise<Response> =>{
    const data = await updateUserService(req,res)
    return res.status(201).json(data)
}