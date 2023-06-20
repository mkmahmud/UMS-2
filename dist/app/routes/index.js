"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../Modules/users/user.route");
const academicSemester_route_1 = require("../Modules/academicSemester/academicSemester.route");
const academicFaculty_route_1 = require("../Modules/academicFaculty/academicFaculty.route");
const academicDepartment_route_1 = require("../Modules/academicDepartment/academicDepartment.route");
const routes = express_1.default.Router();
// Routes
const Routers = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemester_route_1.academicSemesterRoutes,
    },
    {
        path: '/academic-faculty',
        route: academicFaculty_route_1.academicFacultyRoutes,
    },
    {
        path: '/academic-department',
        route: academicDepartment_route_1.academicDepartmentRoutes,
    },
];
Routers.forEach(route => routes.use(route.path, route.route));
// routes.use('users/', UserRoutes)
// routes.use('academic-semesters/', academicSemesterRoutes)
exports.default = routes;
