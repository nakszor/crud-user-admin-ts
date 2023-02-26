import { Request, Response } from 'express'
import AppError from '../errors/appError'
import createUserService from '../services/users/createUsers.service'
import listUserService from '../services/users/listUser.service'
import retrieveUserService from '../services/users/retrieveUser.service'
import updateUserService from '../services/users/updateUser.Service'
import deleteUserService from '../services/users/deleteUser.service'
import reactivateUserService from '../services/users/reactivateUser.service'

export const createUserController = async (req: Request, res: Response):Promise<Response> =>{
  try {  
    const data = await createUserService(req.body)
    return res.status(201).json(data)
  }
  catch (error) {
    throw new AppError('An error ocurred while creating the user',500)
  }
}
export const retrieveUserController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await retrieveUserService(req, res);
    return res.status(200).json(data)
  } 
  catch (error) {
    throw new AppError('An error ocurred while listing the user',500)
  }
}
export const updateUserController = async (req: Request, res: Response): Promise<Response> => {
  try {
      const updatedUserData = await updateUserService(req);
      return res.status(200).json(updatedUserData);
  }
  catch (error) {
    throw new AppError('An error ocurred while updating the user',500)
  }
}
export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
  try {
    await deleteUserService(req,res);
    return res.sendStatus(204)
  } 
  catch (error) {
    throw new AppError('An error ocurred while deleting the user',500)
  }
}
export const listUserController = async (req: Request, res: Response):Promise<Response> =>{
  try {
      const data = await listUserService()
      return res.status(200).json(data)
  } 
  catch (error) {
    throw new AppError('An error ocurred while listing the users',500)
  }
}
export const reactivateUserController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await reactivateUserService(req,res);
    return res.status(200).json(user)
  } 
  catch (error) {
    throw new AppError('An error ocurred while reactivating the user',500)
  }
}