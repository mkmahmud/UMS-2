import express from 'express'
import { AdminController } from './admin.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AdminValidation } from './admin.validation'

const router = express.Router()

router.get('/:id', AdminController.getSingleAdmin)
router.get('/', AdminController.getAllAdmin)

router.patch(
  '/:id',
AdminController.updateAdmin
)

router.delete('/:id', AdminController.deleteAdmin)

export const AdminRoutes = router
