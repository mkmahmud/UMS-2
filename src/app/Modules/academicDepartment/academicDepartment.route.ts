import express from 'express'
// import { UserController } from './user.controller'

import { departmentController } from './academicDepartment.controller'

const router = express.Router()

router.post(
  '/create-academic-department',
  departmentController.createAcademicDepartment
)

export const academicDepartmentRoutes = router
