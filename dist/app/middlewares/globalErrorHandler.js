"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configure_1 = __importDefault(require("../../configure"));
const handelValiditionError_1 = __importDefault(require("../../Errors/handelValiditionError"));
const zod_1 = require("zod");
const ApiErrors_1 = __importDefault(require("../../Errors/ApiErrors"));
const handelZodError_1 = __importDefault(require("../../Errors/handelZodError"));
const handelCasrError_1 = __importDefault(require("../../Errors/handelCasrError"));
const globalErrorHandler = (error, req, res) => {
    // eslint-disable-next-line no-unused-expressions
    configure_1.default.env === 'development'
        ? // eslint-disable-next-line no-console
            console.log('GlobalErrorHandler ~', error)
        : console.log('GlobalErrorHandler ~', error);
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessage = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedError = (0, handelValiditionError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handelZodError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedError = (0, handelCasrError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
        // res.status(200).json({ error })
    }
    else if (error instanceof ApiErrors_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: configure_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
