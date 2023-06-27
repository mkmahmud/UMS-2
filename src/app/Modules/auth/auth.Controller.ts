import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import { IAuthResponse } from "./auth.interface";
import configure from "../../../configure";

const login = catchAsync(async (req: Request, res: Response) => {

    const {...loginData} = req.body 
     
    const result = await AuthService.loginUser(loginData);

    const {refreshTOcken , ...others} = result

    // set refresh tocken into cookie 
    const cookieOptions = {
        secure: configure.env === 'production',
        httpOnly: true
    }
    res.cookie('refreshTocken', refreshTOcken, cookieOptions)



    sendResponse<IAuthResponse>(res, {
        statusCode: 200,
        success: true,
        message: 'Logged In Successfully',
        data:others
    })
})
const refreshTocken = catchAsync(async (req: Request, res: Response) => {

    const {refreshTocken} = req.cookies 
     
    const result = await AuthService.refreshTocken(refreshTocken);

 
    // set refresh tocken into cookie 
    const cookieOptions = {
        secure: configure.env === 'production',
        httpOnly: true
    }
    res.cookie('refreshTocken', refreshTocken, cookieOptions)



    sendResponse<IAuthResponse>(res, {
        statusCode: 200,
        success: true,
        message: 'Logged In Successfully',
        data:result
    })
})


export const authConntroller = {
    login,
    refreshTocken
}