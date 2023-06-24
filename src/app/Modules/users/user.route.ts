import express from 'express'
import { UserController } from './user.controller'
import ValidateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

// Create Student
router.post(
  '/create-student',
  ValidateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
)


// Create Faculty
router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculy
)

// Create Admin
router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
)

export const UserRoutes = router
