import express from 'express'
// import { UserController } from './user.controller'
import ValidateRequest from '../../middlewares/validateRequest'

import { AcademicFacultyValidation } from './academicFaculty.Validation'
import { academicController } from './academicFaculty.controller'

const router = express.Router()

router.post(
  '/create-academic-Faculty',
  ValidateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  academicController.createAcademicFaculty
)
router.patch(
  '/singel-Faculty/:id',
  ValidateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  academicController.updateSingelFaculty
)
router.delete('/singel-Faculty/:id', academicController.deleteFaculty)
router.get('/singel-Faculty/:id', academicController.getSingelFaculty)

router.get('/academic-Faculty', academicController.getAllFaculty)

export const academicFacultyRoutes = router
