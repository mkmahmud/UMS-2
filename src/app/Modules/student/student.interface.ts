import { Model, Schema } from 'mongoose'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'

type studentGender = 'Male' | 'Female' | 'Others'
type studentBloodGroup = 'O+' | 'O-' | 'A+' | 'A-' | 'AB+' | 'AB-' | 'B+' | 'B-'

export type IStudent = {
  id: string
  name: {
    firstName: string
    middleName: string
    lastName: string
  }
  gender: studentGender
  dateOfBirth: string
  email: string
  contactNo: string
  emContact: string
  pregentAddress: string
  parmanentAddress: string
  bloodGroup?: studentBloodGroup
  gurdian: {
    father: {
      fatherName: string
      fatherOccupation: string
      fatherContact: string
      address: string
    }
    mother: {
      motherName: string
      motherOccupation: string
      motherContact: string
      address: string
    }
  }
  localGurdian: {
    localGurdianName: string
    localGurdianOccupation: string
    localGurdianContact: string
    address: string
  }
  academicFaculty: Schema.Types.ObjectId | IAcademicFaculty
  academicDepartment: Schema.Types.ObjectId | IAcademicDepartment
  academicSemester: Schema.Types.ObjectId | IAcademicSemester
  profileImage?: string
}

export type StudentModel = Model<IStudent, Record<string, unknown>>
