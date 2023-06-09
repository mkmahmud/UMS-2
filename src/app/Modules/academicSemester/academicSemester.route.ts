import express from 'express'
// import { UserController } from './user.controller'
import ValidateRequest from '../../middlewares/validateRequest'

import { AcademicSemesterValidation } from './academicSemesterValidation'
import { academicController } from './academicSemester.controller'

const router = express.Router()

router.post(
  '/create-academic-semester',
  ValidateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  academicController.createAcademicSemester
)

export const academicSemesterRoutes = router
