import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.modal'

const findLastStudentUserID = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  return lastStudent?.id ? lastStudent.id.substring(4) : undefined
}

export const genarateStudentId = async (
  academicSemester: IAcademicSemester | null
) => {
  const currentId =
    (await findLastStudentUserID()) || (0).toString().padStart(5, '0')
  let incrementedID = (parseInt(currentId) + 1).toString().padStart(5, '0')

  incrementedID = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedID}`

  return incrementedID
}

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined
}

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0')
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `F-${incrementedId}`

  return incrementedId
}


export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined
}

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0')
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `A-${incrementedId}`

  return incrementedId
}
