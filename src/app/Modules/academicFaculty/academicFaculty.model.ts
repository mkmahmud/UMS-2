import { AcademicFacultyTitle } from './academicFaculty.constant'
import {
  IAcademicFaculty,
  AcademicFacultyModel,
} from './academicFaculty.interface'
import { Schema, model } from 'mongoose'

// Creating User Schema
const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicFacultyTitle,
    },
  },
  {
    timestamps: true,
  }
)

academicFacultySchema.pre('save', async function (next) {
  const existingFaculty = await AcademicFaculty.findOne({
    title: this.title,
  })

  if (existingFaculty) {
    const error = new Error('Faculty already exists')
    return next(error)
  }
})

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
)
