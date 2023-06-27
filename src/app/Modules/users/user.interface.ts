import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'
import { IFaculty } from '../faculty/faculty.interface'
import { IAdmin } from '../admin/admin.interface'

export type IUser = {
  id: string
  role: string
  password: string
  needsPasswordChange: true | false,
  student?: Types.ObjectId | IStudent
  faculty?: Types.ObjectId | IFaculty
  admin?: Types.ObjectId | IAdmin
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type IUserMethods = {
  IsUserExist(id: string): Promise<Partial<IUser> | null>
  PasswordNotMatched(givenPassword: string, savePassword: string): Promise<boolean>
}

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// Create a new Model type that knows about IUserMethods...
// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>
