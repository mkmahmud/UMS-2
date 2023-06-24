import { Model, Types } from 'mongoose'
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface'

export type UserName = {
  firstName: string
  lastName: string
  middleName: string
}

export type IAdmin = {
  id: string
  name: UserName
  profileImage: string
  dateOfBirth?: string
  email: string
  contactNo: string
  emergencyContactNo: string
  gender?: 'male' | 'female'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  academicDepartment: Types.ObjectId | IAcademicDepartment
  designation: string
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>

export type IAdminFilters = {
  searchTerm?: string
  id?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
  gender?: 'male' | 'female'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  academicDepartment?: string
  designation?: string
}
