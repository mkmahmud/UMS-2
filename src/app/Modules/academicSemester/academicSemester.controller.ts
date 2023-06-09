import { NextFunction, Request, Response } from 'express'

import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Semester  created Successfully',
      data: result,
    })

    next()
  }
)

export const academicController = {
  createAcademicSemester,
}
