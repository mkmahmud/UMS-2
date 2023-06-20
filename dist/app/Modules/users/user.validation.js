"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required!',
                }),
                middleName: zod_1.z
                    .string({
                    required_error: 'Middle name is required!',
                })
                    .optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required!',
                }),
            }),
        }),
        gender: zod_1.z.enum(['male', 'Female', 'Others'], {
            required_error: 'Gender is required',
        }),
        dateOfBirth: zod_1.z.string({
            required_error: 'Date of Birth is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact Number is required',
        }),
        emContact: zod_1.z.string({
            required_error: 'Emergency Contact Number is required',
        }),
        pregentAddress: zod_1.z.string({
            required_error: 'Present address is required',
        }),
        parmanentAddress: zod_1.z.string({
            required_error: 'Permanent address is required',
        }),
        bloodGroup: zod_1.z
            .enum(['O+', 'O-', 'A+', 'A-', 'AB+', 'AB-', 'B+', 'B-'], {
            required_error: 'Blood group is required',
        })
            .optional(),
        gurdian: zod_1.z.object({
            father: zod_1.z.object({
                fatherName: zod_1.z.string({
                    required_error: 'Father name is required',
                }),
                fatherOccupation: zod_1.z.string({
                    required_error: 'Father occupation is required',
                }),
                fatherContact: zod_1.z.string({
                    required_error: 'Father contact is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Father address is required',
                }),
            }),
            mother: zod_1.z.object({
                motherName: zod_1.z.string({
                    required_error: 'Mother name is required',
                }),
                motherOccupation: zod_1.z.string({
                    required_error: 'Mother occupation is required',
                }),
                motherContact: zod_1.z.string({
                    required_error: 'Mother contact is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Mother address is required',
                }),
            }),
        }),
        localGurdian: zod_1.z.object({
            localGurdianName: zod_1.z.string({
                required_error: 'Local Guardian Name is required',
            }),
            localGurdianOccupation: zod_1.z.string({
                required_error: 'Local Guardian occupation is required',
            }),
            localGurdianContact: zod_1.z.string({
                required_error: 'Local Guardian contact is required',
            }),
            address: zod_1.z.string({
                required_error: 'Local Guardian address is required',
            }),
        }),
        profileImage: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
