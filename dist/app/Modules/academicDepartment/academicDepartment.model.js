"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartment = void 0;
const mongoose_1 = require("mongoose");
const AcademicDepartmentSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.academicDepartment = (0, mongoose_1.model)('academicDepartment', AcademicDepartmentSchema);
