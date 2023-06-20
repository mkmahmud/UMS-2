"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import { UserController } from './user.controller'
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicFaculty_Validation_1 = require("./academicFaculty.Validation");
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const router = express_1.default.Router();
router.post('/create-academic-Faculty', (0, validateRequest_1.default)(academicFaculty_Validation_1.AcademicFacultyValidation.createAcademicFacultyZodSchema), academicFaculty_controller_1.academicController.createAcademicFaculty);
router.patch('/singel-Faculty/:id', (0, validateRequest_1.default)(academicFaculty_Validation_1.AcademicFacultyValidation.updateAcademicFacultyZodSchema), academicFaculty_controller_1.academicController.updateSingelFaculty);
router.delete('/singel-Faculty/:id', academicFaculty_controller_1.academicController.deleteFaculty);
router.get('/singel-Faculty/:id', academicFaculty_controller_1.academicController.getSingelFaculty);
router.get('/academic-Faculty', academicFaculty_controller_1.academicController.getAllFaculty);
exports.academicFacultyRoutes = router;
