import { z } from 'zod'
export const gender = ['Male', 'Female']
export const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const UpdateStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z
      .object({
        name: z
          .object({
            firstName: z.string().optional(),
            middleName: z.string().optional(),
            lastName: z.string().optional(),
          })
          .optional(),
        gender: z.enum([...gender] as [string, ...string[]]).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().optional(),
        contactNo: z.string().optional(),
        emContact: z.string().optional(),
        pregentAddress: z.string().optional(),
        parmanentAddress: z.string().optional(),
        bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
        gurdian: z
          .object({
            father: z.object({
              fatherName: z.string().optional(),
              fatherOccupation: z.string().optional(),
              fatherContact: z.string().optional(),
              address: z.string().optional(),
            }),
            mother: z.object({
              motherName: z.string().optional(),
              motherOccupation: z.string().optional(),
              motherContact: z.string().optional(),
              address: z.string().optional(),
            }),
          })
          .optional(),
        localGurdian: z
          .object({
            localGurdianName: z.string().optional(),
            localGurdianOccupation: z.string().optional(),
            localGurdianContact: z.string().optional(),
            address: z.string().optional(),
          })
          .optional(),
      })
      .optional(),

    profileImage: z.string().optional(),
  }),
})

export const StudentValidation = {
  UpdateStudentZodSchema,
}
