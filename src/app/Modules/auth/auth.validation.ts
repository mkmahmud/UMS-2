import { z } from 'zod'


const LoginZodSchema = z.object({
  body: z.object({
    id: z.string({
        required_error:"Id Is Required"
    }),
    password: z.string({
        required_error:"Password Is Required"
    }),
  }),
})

const refreshTocken = z.object({
  cookies: z.object({
    refreshTocken: z.string({
        required_error:"Refresh Tocken Is Required"
    })
  }),
})
const changePassword = z.object({
  body: z.object({
    oldPassword: z.string({
        required_error:"Old PasswordIs Required"
    }),
    newPassword: z.string({
        required_error:"New PasswordIs Required"
    })
  }),
})

export const AuthValidation = {
    LoginZodSchema,
    refreshTocken,
    changePassword
}
