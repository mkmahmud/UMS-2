"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyValidation = void 0;
// Req validition
// body --> object
// data --> object
const zod_1 = require("zod");
const academicFaculty_constant_1 = require("./academicFaculty.constant");
const createAcademicFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academicFaculty_constant_1.AcademicFacultyTitle], {
            required_error: 'Title is required',
        }),
    }),
});
const updateAcademicFacultyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .enum([...academicFaculty_constant_1.AcademicFacultyTitle], {
            required_error: 'Title is required',
        })
            .optional(),
    }),
});
exports.AcademicFacultyValidation = {
    createAcademicFacultyZodSchema,
    updateAcademicFacultyZodSchema,
};
