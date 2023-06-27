
import jwt, { Secret } from "jsonwebtoken";
import ApiError from "../../../Errors/ApiErrors"
import configure from "../../../configure";
import { User } from "../users/user.modal"
import { IAuthResponse, ILogin } from "./auth.interface"
import { jwtHelpers } from "../../../helpers/jwt";




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
    refreshTocken
}