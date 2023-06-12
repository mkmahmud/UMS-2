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
router.patch(
  '/singel-semester/:id',
  ValidateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  academicController.updateSingelSemester
)
router.delete('/singel-semester/:id', academicController.deleteSemester)
router.get('/singel-semester/:id', academicController.getSingelSemester)

router.get('/academic-semester', academicController.getAllSemester)

export const academicSemesterRoutes = router
