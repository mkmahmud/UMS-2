"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import { UserController } from './user.controller'
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicSemesterValidation_1 = require("./academicSemesterValidation");
const academicSemester_controller_1 = require("./academicSemester.controller");
const router = express_1.default.Router();
router.post('/create-academic-semester', (0, validateRequest_1.default)(academicSemesterValidation_1.AcademicSemesterValidation.createAcademicSemesterZodSchema), academicSemester_controller_1.academicController.createAcademicSemester);
router.patch('/singel-semester/:id', (0, validateRequest_1.default)(academicSemesterValidation_1.AcademicSemesterValidation.updateAcademicSemesterZodSchema), academicSemester_controller_1.academicController.updateSingelSemester);
router.delete('/singel-semester/:id', academicSemester_controller_1.academicController.deleteSemester);
router.get('/singel-semester/:id', academicSemester_controller_1.academicController.getSingelSemester);
router.get('/academic-semester', academicSemester_controller_1.academicController.getAllSemester);
exports.academicSemesterRoutes = router;
