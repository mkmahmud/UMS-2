import { Request, RequestHandler, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from './user.interface'


// Create Student
const createStudent = catchAsync(async (req: Request, res: Response) => {
  
  const { student, ...user } = req.body

  const result = await UserService.createStudent(student, user)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User created Successfully',
    data: result,
  })
})


// Create Faculty
const createFaculy: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body
    const result = await UserService.createFaculty(faculty, userData)

    sendResponse<IUser>(res, {
      statusCode: 200,
      success: true,
      message: 'faculty created successfully!',
      data: result,
    })
  }
)

// Create Admin
const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body
    const result = await UserService.createAdmin(admin, userData)

    sendResponse<IUser>(res, {
      statusCode: 200,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    })
  }
)


export const UserController = {
  createStudent,
  createFaculy,
  createAdmin
}
