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
exports.genarateFacultyId = exports.genarateStudentId = void 0;
const user_modal_1 = require("./user.modal");
const findLastStudentUserID = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_modal_1.User.findOne({ role: 'student' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent.id.substring(4) : undefined;
});
const genarateStudentId = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield findLastStudentUserID()) || (0).toString().padStart(5, '0');
    let incrementedID = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedID = `${academicSemester.year.substring(2)}${academicSemester.code}${incrementedID}`;
    return incrementedID;
});
exports.genarateStudentId = genarateStudentId;
const findLastFacultyUserID = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFacultyID = yield user_modal_1.User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    return (lastFacultyID === null || lastFacultyID === void 0 ? void 0 : lastFacultyID.id) ? lastFacultyID.id.substring(2) : undefined;
});
const genarateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield findLastFacultyUserID()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `F-${incrementedId}`;
    return incrementedId;
});
exports.genarateFacultyId = genarateFacultyId;
