"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiErrors_1 = __importDefault(require("../../../Errors/ApiErrors"));
const configure_1 = __importDefault(require("../../../configure"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const user_modal_1 = require("./user.modal");
const user_utlis_1 = require("./user.utlis");
const student_model_1 = require("../student/student.model");
// import { genarateFacultyId } from './user.utlis'
const createStudent = (student, user) => __awaiter(void 0, void 0, void 0, function* () {
    // Incremantal Id
    // const id = await genarateFacultyId()
    // user.id = id
    //   Defualt Password
    if (!user.password) {
        user.password = configure_1.default.D_USER_PASSWORD;
    }
    // set Role
    user.role = 'student';
    const academicSemester = yield academicSemester_model_1.AcademicSemester.findById(student.academicSemester);
    // Genarate Student Id
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = yield (0, user_utlis_1.genarateStudentId)(academicSemester);
        user.id = id;
        student.id = id;
        const newStudent = yield student_model_1.Student.create([student], { session });
        if (!newStudent.length) {
            throw new ApiErrors_1.default(404, 'Failed to create Student');
        }
        // set student _id to user
        user.student = newStudent[0]._id;
        const newUser = yield user_modal_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiErrors_1.default(404, 'Failed to create User');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield user_modal_1.User.findOne({ id: newUserAllData.id }).populate({
            path: 'student',
            populate: [
                {
                    path: 'academicSemester',
                },
                {
                    path: 'academicFaculty',
                },
            ],
        });
    }
    return newUserAllData;
});
exports.UserService = {
    createStudent,
};
