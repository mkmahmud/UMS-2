import { SortOrder } from 'mongoose'
import { StatusCodes } from 'http-status-codes'
import ApiError from '../../../Errors/ApiErrors'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  AcademicSemesterTitleCodeMapper,
  searchFileds,
} from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterFillters,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (AcademicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(400, 'Title and Code not matched')
  }

  const result = await AcademicSemester.create(payload)
  return result
}

const getAllSemester = async (
  filters: IAcademicSemesterFillters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
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

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await AcademicSemester.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingelSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)
  return result
}

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    AcademicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Title and Code not matched')
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}
const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id)
  return result
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
  getSingelSemester,
  updateSemester,
  deleteSemester,
}
