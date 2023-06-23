import express from 'express'
import { UserRoutes } from '../Modules/users/user.route'
import { academicSemesterRoutes } from '../Modules/academicSemester/academicSemester.route'
import { academicFacultyRoutes } from '../Modules/academicFaculty/academicFaculty.route'
import { academicDepartmentRoutes } from '../Modules/academicDepartment/academicDepartment.route'
import { StudentRoutes } from '../Modules/student/student.route'
import { FacultyRoutes } from '../Modules/faculty/faculty.route'

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
  {
    path: '/academic-department',
    route: academicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
]

Routers.forEach(route => routes.use(route.path, route.route))

// routes.use('users/', UserRoutes)
// routes.use('academic-semesters/', academicSemesterRoutes)

export default routes
