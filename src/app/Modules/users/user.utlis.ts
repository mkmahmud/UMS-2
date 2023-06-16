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

const findLastFacultyUserID = async () => {
  const lastFacultyID = await User.findOne(
    { role: 'faculty' },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean()

  return lastFacultyID?.id ? lastFacultyID.id.substring(2) : undefined
}

export const genarateFacultyId = async (): Promise<string | undefined> => {
  const currentId =
    (await findLastFacultyUserID()) || (0).toString().padStart(5, '0')

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `F-${incrementedId}`

  return incrementedId
}
