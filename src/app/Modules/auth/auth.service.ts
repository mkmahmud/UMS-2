
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ApiError from "../../../Errors/ApiErrors"
import configure from "../../../configure";
import { User } from "../users/user.modal"
import { IAuthResponse, IChangePassword, ILogin } from "./auth.interface"
import { jwtHelpers } from "../../../helpers/jwt";

import bcrypt from 'bcrypt'


const loginUser = async (payload: ILogin):Promise<IAuthResponse> => {

    const {id, password} = payload

    
    // const IsUserExist = await user.isUserExist(id)
    // if(!IsUserExist){
    //     throw new ApiError(404, 'User Not Found')
    // }
    
    const isUserExist = await User.isUserExist(id)

    if (!isUserExist) {
      throw new ApiError(404, 'User does not exist');
    }

    // Matching password
   
    // if(IsUserExist?.password && !(await user.isPassowrdMatch(password, IsUserExist?.password))){
    //     throw new ApiError(401, 'Password Does not matched!')
    // }

    if (
        !(await User.isPasswordMatched(password, isUserExist?.password))
      ) {
        throw new ApiError(401, 'Password is incorrect');
      }

    // create access JWT password

    const {id:userId, role, needsPasswordChange} = isUserExist
    const accessTOcken = jwtHelpers.createTocken({userId, role} , configure.JWT_SECRET as Secret, configure.JWT_EXPIRES as string)
    
  
    const refreshTOcken = jwtHelpers.createTocken({userId, role} , configure.JWT_REFRESH_SCREET as Secret, configure.JWT_REFRESH_EXPIERES_IN as string)
    
    
    return {
        accessTOcken,
        refreshTOcken,
        needsPasswordChange,
        
    }
}


const changePassword = async (user: JwtPayload | null, payload:IChangePassword ): Promise<void> => {

  const {oldPassword, newPassword} = payload

  const isUserExist = await User.isUserExist(user?.userId)
  if(!isUserExist) {
    throw new ApiError(404, 'User Does not exist') 
  }

  if (
    !(await User.isPasswordMatched(oldPassword, isUserExist?.password))
  ) {
    throw new ApiError(401, 'Old Password is incorrect');
  }
  
  // Hash password before save
  const newHashPassword = await bcrypt.hash(newPassword, 12)

  const UpdatedData = {
    password: newHashPassword,
    needsPasswordChange:false,
    passwordChnageAt: new Date()
  }

  // update 
  await User.findOneAndUpdate({id:user?.userId},UpdatedData)

  
}


const refreshTocken =async (tocken:string) => {

    let verifiedTocken = null

 try{
    verifiedTocken = jwt.verify(tocken, configure.JWT_REFRESH_SCREET);
    
    

 }  catch(error){
    throw new ApiError(403,'Invalid Refresh tocken')
 } 

const {userId} = verifiedTocken


const isUserExist = await User.isUserExist(userId)
if(!isUserExist){
    throw new ApiError(404, 'User does Not exist')
}


const newAccessTocken = jwtHelpers.createTocken({id: isUserExist?.id, role: isUserExist?.role}, configure.JWT_SECRET as Secret, configure.JWT_EXPIRES as string)

return {
    accessTocken :newAccessTocken
}

}

export const AuthService = {
    loginUser,
    refreshTocken,
    changePassword
}