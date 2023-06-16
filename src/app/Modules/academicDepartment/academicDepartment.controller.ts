import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { IAcademicDepartment } from './academicDepartment.interface'
import { academicDepartmentService } from './academicDepertment.service'
import sendResponse from '../../../shared/sendResponse'

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const academicDepartmentData = req.body as IAcademicDepartment
    const result = await academicDepartmentService.createDepartment(
      academicDepartmentData
    )

    sendResponse<IAcademicDepartment>(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Department created Successfully',
      data: result,
    })
  }
)

export const departmentController = {
  createAcademicDepartment,
}
