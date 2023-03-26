import { Request, Response } from 'express'
import {createUserService, listUserService, reactivateUserService,
        retrieveUserService, updateUserService, deleteUserService} from '../services/users'

export const createUserController = async (req: Request, res: Response):Promise<Response> =>{
    const data = await createUserService(req.body)
    return res.status(201).json(data)
}
export const retrieveUserController = async (req: Request, res: Response): Promise<Response> => {
    const data = await retrieveUserService(req, res);
    return res.status(200).json(data)
}
export const updateUserController = async (req: Request, res: Response): Promise<Response> => {
      const updatedUserData = await updateUserService(req);
      return res.status(200).json(updatedUserData);
}
export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
    await deleteUserService(req,res);
    return res.sendStatus(204)
} 
export const listUserController = async (req: Request, res: Response):Promise<Response> =>{
    const data = await listUserService()
    return res.status(200).json(data)
}
export const reactivateUserController = async (req: Request, res: Response): Promise<Response> => {
    const user = await reactivateUserService(req,res);
    return res.status(200).json(user)
}