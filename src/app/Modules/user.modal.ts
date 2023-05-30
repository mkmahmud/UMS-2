import { Model, Schema, model } from 'mongoose'
import { IUser } from './user.interface'

// Create a new Model type that knows about IUserMethods...
type UserModel = Model<IUser, object>

// Creating User Schema
const userSchema = new Schema<IUser>(
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
    },
  },
  {
    timestamps: true,
  }
)

export const User = model<IUser, UserModel>('User', userSchema)
