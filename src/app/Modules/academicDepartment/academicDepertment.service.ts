import { IAcademicDepartment } from './academicDepartment.interface'
import { academicDepartment } from './academicDepartment.model'

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await academicDepartment.create(payload)).populate(
    'academicFaculty'
  )
  return result
}

export const academicDepartmentService = {
  createDepartment,
}
