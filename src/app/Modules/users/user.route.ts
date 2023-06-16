import express from 'express'
import { UserController } from './user.controller'
import ValidateRequest from '../../middlewares/validateRequest'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post('/create-student', UserController.createStudent)

export const UserRoutes = router
