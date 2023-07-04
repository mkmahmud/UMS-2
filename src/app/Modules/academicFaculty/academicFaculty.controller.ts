import { Request, Response } from 'express'
import { AcademicFacultyService } from './academicFaculty.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicFaculty } from './academicFaculty.interface'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { filterAbleFilds } from './academicFaculty.constant'

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const academicFacultyData = req.body as IAcademicFaculty
    const result = await AcademicFacultyService.createFaculty(
      academicFacultyData
    )

    sendResponse<IAcademicFaculty>(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Faculty created Successfully',
      data: result,
      meta: {
        page: 0,
        limit: 0,
        total: 0,
      },
    })
  }
)

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {

  console.log(req.headers.authorization)
  console.log(req.user)

  // eslint-disable-next-line no-undef
  const filters = pick(req.query, filterAbleFilds)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicFacultyService.getAllFaculty(
    filters,
    paginationOptions
  )

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty Data Retrieve Successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingelFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicFacultyService.getSingelFaculty(id)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty created Successfully',
    data: result,
  })
})

const updateSingelFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const data = req.body
  const result = await AcademicFacultyService.updateFaculty(id, data)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty Updated Successfully',
    data: result,
  })
})
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicFacultyService.deleteFaculty(id)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty Deleted Successfully',
    data: result,
  })
})

export const academicController = {
  createAcademicFaculty,
  getAllFaculty,
  getSingelFaculty,
  updateSingelFaculty,
  deleteFaculty,
}
