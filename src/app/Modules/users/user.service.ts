import mongoose from 'mongoose'
import ApiError from '../../../Errors/ApiErrors'
import config from '../../../configure'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { IStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.modal'
import { genarateStudentId, generateAdminId, generateFacultyId } from './user.utlis'
import { Student } from '../student/student.model'
import { IFaculty } from '../faculty/faculty.interface'
import { Faculty } from '../faculty/faculty.model'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'
// import { genarateFacultyId } from './user.utlis'

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // Incremantal Id

  // const id = await genarateFacultyId()
  // user.id = id

  //   Defualt Password
  if (!user.password) {
    user.password = config.D_USER_PASSWORD as string
  }

  // set Role
  user.role = 'student'

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  )

  // Genarate Student Id
  let newUserAllData = null

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const id = await genarateStudentId(academicSemester)

    user.id = id
    student.id = id

    const newStudent = await Student.create([student], { session })
    if (!newStudent.length) {
      throw new ApiError(404, 'Failed to create Student')
    }

    // set student _id to user
    user.student = newStudent[0]._id
    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(404, 'Failed to create User')
    }

    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }

  return newUserAllData
}

// Create Faculty
// Create Faculty

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.DEFAULT_FACULTY_PASS as string
  }

  // set role
  user.role = 'faculty'

  // generate faculty id
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const id = await generateFacultyId()
    user.id = id
    faculty.id = id

    const newFaculty = await Faculty.create([faculty], { session })

    if (!newFaculty.length) {
      throw new ApiError(404, 'Failed to create faculty ')
    }

    user.faculty = newFaculty[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(404, 'Failed to create faculty')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
    })
  }

  return newUserAllData
}

// Create Admin

// Create Faculty
// Create Faculty

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.DEFAULT_ADMIN_PASS as string
  }

  // set role
  user.role = 'admin'

  // generate faculty id
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const id = await generateAdminId()
    user.id = id
    admin.id = id

    const newFaculty = await Admin.create([admin], { session })

    if (!newFaculty.length) {
      throw new ApiError(404, 'Failed to create Admin ')
    }

    user.admin = newFaculty[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(404, 'Failed to create Admin')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
    })
  }

  return newUserAllData
}



export const UserService = {
  createStudent,
  createFaculty,
  createAdmin
}
