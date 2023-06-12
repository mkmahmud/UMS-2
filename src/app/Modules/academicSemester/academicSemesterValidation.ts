// Req validition
// body --> object
// data --> object
import { z } from 'zod'
import {
  AcademicSemesterCode,
  AcademicSemesterMonth,
  AcademicSemesterTitle,
} from './academicSemester.constant'

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicSemesterTitle] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'Year is required',
    }),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...AcademicSemesterMonth] as [string, ...string[]], {
      required_error: 'Start Month is required',
    }),
    endMonth: z.enum([...AcademicSemesterMonth] as [string, ...string[]], {
      required_error: 'End  Month is required',
    }),
  }),
})

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...AcademicSemesterTitle] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required',
        })
        .optional(),
      code: z
        .enum([...AcademicSemesterCode] as [string, ...string[]], {
          required_error: 'Code is required',
        })
        .optional(),
      startMonth: z
        .enum([...AcademicSemesterMonth] as [string, ...string[]], {
          required_error: 'Start Month is required',
        })
        .optional(),
      endMonth: z
        .enum([...AcademicSemesterMonth] as [string, ...string[]], {
          required_error: 'End  Month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.title),
    {
      message: 'You need to update title and code both ',
    }
  )

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
}
