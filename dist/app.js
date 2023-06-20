"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const http_status_codes_1 = require("http-status-codes");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
// import ApiError from './Errors/ApiErrors'
// Cors
app.use((0, cors_1.default)());
// Parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Application ROutes
// app.use('/api/v1/users/', UserRoutes)
// app.use('/api/v1/academic-semesters/', academicSemesterRoutes)
app.use('/api/v1', routes_1.default);
// testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Server is runing')
//   // throw new ApiError(400, 'Pre baba error')
//   Promise.reject(new Error('Uhaled Promise Rejection'))
//   // next('Ore Baba Error Next')
// })
// Global testing
app.use(globalErrorHandler_1.default);
// Handek not found
app.use((req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessage: [
            {
                path: '.',
                message: 'API not found',
            },
        ],
    });
    next();
});
exports.default = app;
