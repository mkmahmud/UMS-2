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
exports.academicController = void 0;
const academicFaculty_service_1 = require("./academicFaculty.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const academicFaculty_constant_1 = require("./academicFaculty.constant");
const createAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicFacultyData = req.body;
    const result = yield academicFaculty_service_1.AcademicFacultyService.createFaculty(academicFacultyData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Academic Faculty created Successfully',
        data: result,
        meta: {
            page: 0,
            limit: 0,
            total: 0,
        },
    });
}));
const getAllFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-undef
    const filters = (0, pick_1.default)(req.query, academicFaculty_constant_1.filterAbleFilds);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield academicFaculty_service_1.AcademicFacultyService.getAllFaculty(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Academic Faculty Data Retrieve Successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingelFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicFaculty_service_1.AcademicFacultyService.getSingelFaculty(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Academic Faculty created Successfully',
        data: result,
    });
}));
const updateSingelFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield academicFaculty_service_1.AcademicFacultyService.updateFaculty(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Academic Faculty Updated Successfully',
        data: result,
    });
}));
const deleteFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicFaculty_service_1.AcademicFacultyService.deleteFaculty(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Academic Faculty Deleted Successfully',
        data: result,
    });
}));
exports.academicController = {
    createAcademicFaculty,
    getAllFaculty,
    getSingelFaculty,
    updateSingelFaculty,
    deleteFaculty,
};
