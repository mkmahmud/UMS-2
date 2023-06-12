import {
  AcademicSemesterCode,
  AcademicSemesterMonth,
  AcademicSemesterTitle,
} from './academicSemester.constant'
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from './academicSemester.interface'
import { Schema, model } from 'mongoose'

// Creating User Schema
const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicSemesterTitle,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterMonth,
    },
  },
  {
    timestamps: true,
  }
)

academicSemesterSchema.pre('save', async function (next) {
  const existingSemester = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })

  if (existingSemester) {
    const error = new Error('Semester already exists')
    return next(error)
  }
})

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
)
