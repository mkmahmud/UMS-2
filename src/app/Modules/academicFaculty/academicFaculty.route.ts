import express from 'express'
// import { UserController } from './user.controller'
import ValidateRequest from '../../middlewares/validateRequest'

import { AcademicFacultyValidation } from './academicFaculty.Validation'
import { academicController } from './academicFaculty.controller'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.post(
  '/create-academic-Faculty',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ValidateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  academicController.createAcademicFaculty
)
router.patch(
  '/singel-Faculty/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.Faculty),
  ValidateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  academicController.updateSingelFaculty
)
router.delete('/singel-Faculty/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN) , academicController.deleteFaculty)
router.get('/singel-Faculty/:id', auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.Faculty, ENUM_USER_ROLE.STUDENT), academicController.getSingelFaculty)

router.get('/academic-Faculty', auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.Faculty, ENUM_USER_ROLE.STUDENT) , academicController.getAllFaculty)

export const academicFacultyRoutes = router
