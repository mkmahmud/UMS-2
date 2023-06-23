import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { StudentService } from './studentService'
import { IStudent } from './student.interface'
import { filterAbleFilds } from '../academicSemester/academicSemester.constant'
const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  // eslint-disable-next-line no-undef
  const filters = pick(req.query, filterAbleFilds) as IStudentFilters
  const paginationOptions = pick(req.query, paginationFields)

  const result = await StudentService.getAllStudent(filters, paginationOptions)

  sendResponse<IStudent[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Student Data Retrieve Successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingelStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await StudentService.getSingelStudent(id)

  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Student created Successfully',
    data: result,
  })
})

const updateSingelStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const data = req.body
  const result = await StudentService.updateStudent(id, data)
  //   console.log(data)
  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'Student Updated Successfully',
    data: result,
  })
})
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await StudentService.deleteStudent(id)

  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Student Deleted Successfully',
    data: result,
  })
})

export const studentController = {
  getAllStudent,
  getSingelStudent,
  updateSingelStudent,
  deleteStudent,
}
