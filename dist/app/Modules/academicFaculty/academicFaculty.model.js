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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFaculty = void 0;
const academicFaculty_constant_1 = require("./academicFaculty.constant");
const mongoose_1 = require("mongoose");
// Creating User Schema
const academicFacultySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        enum: academicFaculty_constant_1.AcademicFacultyTitle,
    },
}, {
    timestamps: true,
});
academicFacultySchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingFaculty = yield exports.AcademicFaculty.findOne({
            title: this.title,
        });
        if (existingFaculty) {
            const error = new Error('Faculty already exists');
            return next(error);
        }
    });
});
exports.AcademicFaculty = (0, mongoose_1.model)('AcademicFaculty', academicFacultySchema);
