import { Request, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicSemester } from './academicSemester.interface'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { filterAbleFilds } from './academicSemester.constant'

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const academicSemesterData = req.body as IAcademicSemester
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )

    sendResponse<IAcademicSemester>(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Semester created Successfully',
      data: result,
      meta: {
        page: 0,
        limit: 0,
        total: 0,
      },
    })
  }
)

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line no-undef
  const filters = pick(req.query, filterAbleFilds) as IAcademicSemesterFilters
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicSemesterService.getAllSemester(
    filters,
    paginationOptions
  )

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester Data Retrieve Successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingelSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicSemesterService.getSingelSemester(id)

  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester created Successfully',
    data: result,
  })
})

const updateSingelSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const data = req.body
  const result = await AcademicSemesterService.updateSemester(id, data)

  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester Updated Successfully',
    data: result,
  })
})
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicSemesterService.deleteSemester(id)

  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester Deleted Successfully',
    data: result,
  })
})

export const academicController = {
  createAcademicSemester,
  getAllSemester,
  getSingelSemester,
  updateSingelSemester,
  deleteSemester,
}
