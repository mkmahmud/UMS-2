import { Request, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body
  const result = await UserService.createUser(user)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User created Successfully',
    data: result,
  })

  // res.status(200).json({
  //   success: true,
  //   message: 'User Created Successfully',
  //   data: result,
  // })
})

export const UserController = {
  createUser,
}
