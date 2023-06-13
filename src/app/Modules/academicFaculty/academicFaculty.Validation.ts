// Req validition
// body --> object
// data --> object
import { z } from 'zod'
import { AcademicFacultyTitle } from './academicFaculty.constant'

const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicFacultyTitle] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
  }),
})

const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z
      .enum([...AcademicFacultyTitle] as [string, ...string[]], {
        required_error: 'Title is required',
      })
      .optional(),
  }),
})

export const AcademicFacultyValidation = {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
}
