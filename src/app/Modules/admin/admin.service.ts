/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-dgetAllFacultiesisable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'

import ApiError from '../../../Errors/ApiErrors'
import { User } from '../users/user.modal'
import { IAdmin, IAdminFilters } from './admin.interface'
import { adminSearchableFields } from './admin.constant'
import { Admin } from './admin.model'

const getAllAdmin = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calclutePagination(paginationOptions)
  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Admin.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Admin.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({_id: id })

  return result
}

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ _id:id })

  if (!isExist) {
    throw new ApiError(404, 'Admin not found !')
  }

  const { name, ...FacultyData } = payload
  const updatedFacultyData: Partial<IAdmin> = { ...FacultyData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>
      ;(updatedFacultyData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await Admin.findOneAndUpdate({ _id: id }, updatedFacultyData, {
    new: true,
  })
  return result
}

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  // check if the faculty is exist
  const isExist = await Admin.findOne({_id: id })

  if (!isExist) {
    throw new ApiError(404, 'Faculty not found !')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //delete faculty first
    const faculty = await Admin.findOneAndDelete({ id }, { session })
    if (!faculty) {
      throw new ApiError(404, 'Failed to delete Admin')
    }
    //delete user
    await User.deleteOne({ id })
    session.commitTransaction()
    session.endSession()

    return faculty
  } catch (error) {
    session.abortTransaction()
    throw error
  }
}

export const AdminService = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}
