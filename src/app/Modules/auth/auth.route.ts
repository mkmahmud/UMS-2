import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import { authConntroller } from './auth.Controller'


const router = express.Router()


router.post('/login', validateRequest(AuthValidation.LoginZodSchema), authConntroller.login)

router.post('/refreshTocken', validateRequest(AuthValidation.refreshTocken), authConntroller.refreshTocken)



export const AuthRoutes = router
