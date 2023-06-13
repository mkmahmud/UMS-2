import express from 'express'
import { UserRoutes } from '../Modules/users/user.route'
import { academicSemesterRoutes } from '../Modules/academicSemester/academicSemester.route'
import { academicFacultyRoutes } from '../Modules/academicFaculty/academicFaculty.route'

const routes = express.Router()

// Routes
const Routers = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRoutes,
  },
]

Routers.forEach(route => routes.use(route.path, route.route))

// routes.use('users/', UserRoutes)
// routes.use('academic-semesters/', academicSemesterRoutes)

export default routes
