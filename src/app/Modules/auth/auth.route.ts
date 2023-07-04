import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import { authConntroller } from './auth.Controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'


const router = express.Router()


router.post('/login', validateRequest(AuthValidation.LoginZodSchema), authConntroller.login)

router.post('/refreshTocken', validateRequest(AuthValidation.refreshTocken), authConntroller.refreshTocken)

router.post('/change-password', validateRequest(AuthValidation.changePassword), auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.STUDENT, ENUM_USER_ROLE.Faculty ), authConntroller.changePassword)



export const AuthRoutes = router
