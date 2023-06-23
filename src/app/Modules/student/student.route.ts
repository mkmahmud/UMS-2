import express from 'express'
import { studentController } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { StudentValidation } from './student.validation'

const router = express.Router()

router.patch(
  '/:id',
  validateRequest(StudentValidation.UpdateStudentZodSchema),
  studentController.updateSingelStudent
)

router.delete('/:id', studentController.deleteStudent)
router.get('/:id', studentController.getSingelStudent)

router.get('/', studentController.getAllStudent)

// router.post(
//   '/create-student',
//   ValidateRequest(UserValidation.createUserZodSchema),
//   UserController.createStudent
// )

export const StudentRoutes = router
