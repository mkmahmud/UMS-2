"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handelCasrError = (error) => {
    const errors = [
        {
            path: error.path,
            message: 'Invalid Id',
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validition Error',
        errorMessage: errors,
    };
};
exports.default = handelCasrError;
