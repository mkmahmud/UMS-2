"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import { UserController } from './user.controller'
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const router = express_1.default.Router();
router.post('/create-academic-department', academicDepartment_controller_1.departmentController.createAcademicDepartment);
exports.academicDepartmentRoutes = router;
