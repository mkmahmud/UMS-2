import { SortOrder } from 'mongoose'
// import ApiError from '../../../Errors/ApiErrors'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { searchFileds } from './academicFaculty.constant'
import {
  IAcademicFaculty,
  IAcademicFacultyFillters,
} from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload)
  return result
}

const getAllFaculty = async (
  filters: IAcademicFacultyFillters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
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

  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await AcademicFaculty.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingelFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id)
  return result
}

const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}
const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id)
  return result
}

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculty,
  getSingelFaculty,
  updateFaculty,
  deleteFaculty,
}
