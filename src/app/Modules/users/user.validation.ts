import { z } from 'zod'
export const gender = ['Male', 'Female']
export const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required!',
        }),
        middleName: z
          .string({
            required_error: 'Middle name is required!',
          })
          .optional(),
        lastName: z.string({
          required_error: 'Last name is required!',
        }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of Birth is required',
      }),
      email: z.string({
        required_error: 'Email is required',
      }),
      contactNo: z.string({
        required_error: 'Contact Number is required',
      }),
      emContact: z.string({
        required_error: 'Emergency Contact Number is required',
      }),
      pregentAddress: z.string({
        required_error: 'Present address is required',
      }),
      parmanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      gurdian: z.object({
        father: z.object({
          fatherName: z.string({
            required_error: 'Father name is required',
          }),
          fatherOccupation: z.string({
            required_error: 'Father occupation is required',
          }),
          fatherContact: z.string({
            required_error: 'Father contact is required',
          }),
          address: z.string({
            required_error: 'Father address is required',
          }),
        }),
        mother: z.object({
          motherName: z.string({
            required_error: 'Mother name is required',
          }),
          motherOccupation: z.string({
            required_error: 'Mother occupation is required',
          }),
          motherContact: z.string({
            required_error: 'Mother contact is required',
          }),
          address: z.string({
            required_error: 'Mother address is required',
          }),
        }),
      }),
      localGurdian: z.object({
        localGurdianName: z.string({
          required_error: 'Local Guardian Name is required',
        }),
        localGurdianOccupation: z.string({
          required_error: 'Local Guardian occupation is required',
        }),
        localGurdianContact: z.string({
          required_error: 'Local Guardian contact is required',
        }),
        address: z.string({
          required_error: 'Local Guardian address is required',
        }),
      }),
    }),

    profileImage: z.string().optional(),
  }),
})

export const UserValidation = {
  createUserZodSchema,
}
