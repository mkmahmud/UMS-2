import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'

// Creating User Schema
const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select:0
    },
    needsPasswordChange:{
      type: Boolean,
      default: true
    },
    passwordChnageAt:{
      type: Date
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    
    admin:{
      type: Schema.Types.ObjectId,
      ref: 'Admin'
    }
  },
  {
    timestamps: true,
  }
)

// userSchema.methods.IsUserExist = async function (id: string): Promise<Partial<IUser> | null> {
//   const user = await User.findOne({id}, {id: 1, needsPasswordChange: 1, role:1, password:1})
//   return user
// }


// userSchema.methods.PasswordNotMatched = async function (givvenPassword: string, savedPassword: string):Promise <boolean> {
  
//   const result = await bcrypt.compare(givvenPassword, savedPassword)
//   return result
// }


userSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'> | null> {
  return await this.findOne(
    { id: id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};


userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(user.password, 12)
  next()
})

export const User = model<IUser, UserModel>('User', userSchema)
