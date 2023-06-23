import { SortOrder } from 'mongoose'
// import ApiError from '../../../Errors/ApiErrors'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { searchFileds } from './student.constant'
import { IStudent, IStudentFillters } from './student.interface'
import { Student } from './student.model'
import ApiError from '../../../Errors/ApiErrors'

const getAllStudent = async (
  filters: IStudentFillters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filltersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: searchFileds.map(fild => ({
        [fild]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filltersData).length) {
    andConditions.push({
      $and: Object.entries(filltersData).map(([fild, value]) => ({
        [fild]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calclutePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Student.find(whereConditions)
    .populate('academicSemester')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Student.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingelStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicFaculty')
  return result
}

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findById(id)

  if (!isExist) {
    throw new ApiError(404, 'student Not found')
  }

  const { name, ...studentData } = payload

  const updateStudentData: Partial<IStudent> = { ...studentData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent> // `name.fisrtName`
      ;(updateStudentData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await Student.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return result
}
const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id)
  return result
}

export const StudentService = {
  getAllStudent,
  getSingelStudent,
  updateStudent,
  deleteStudent,
}
