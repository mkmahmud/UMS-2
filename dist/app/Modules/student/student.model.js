"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = exports.studentSchema = void 0;
const mongoose_1 = require("mongoose");
const student_constant_1 = require("./student.constant");
exports.studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    gender: {
        type: String,
        enum: student_constant_1.StudentGender,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    emContact: {
        type: String,
    },
    pregentAddress: {
        type: String,
        required: true,
    },
    parmanentAddress: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ['O+', 'O-', 'A+', 'A-', 'AB+', 'AB-', 'B+', 'B-'],
    },
    gurdian: {
        required: true,
        type: {
            father: {
                type: {
                    fatherName: {
                        type: String,
                        required: true,
                    },
                    fatherOccupation: {
                        type: String,
                        required: true,
                    },
                    fatherContact: {
                        type: String,
                        required: true,
                    },
                    address: {
                        type: String,
                        required: true,
                    },
                },
            },
            mother: {
                type: {
                    motherName: {
                        type: String,
                        required: true,
                    },
                    motherOccupation: {
                        type: String,
                        required: true,
                    },
                    motherContact: {
                        type: String,
                        required: true,
                    },
                    address: {
                        type: String,
                        required: true,
                    },
                },
            },
        },
    },
    localGurdian: {
        required: true,
        type: {
            localGurdianName: {
                type: String,
                required: true,
            },
            localGurdianOccupation: {
                type: String,
                required: true,
            },
            localGurdianContact: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
        },
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true,
    },
    profileImage: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Student = (0, mongoose_1.model)('Student', exports.studentSchema);
