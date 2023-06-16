import { Schema, model } from 'mongoose'
import { StudentGender } from './student.constant'
import { IStudent, StudentModel } from './student.interface'

export const studentSchema = new Schema<IStudent>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    gender: {
      type: String,
      enum: StudentGender,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emContact: {
      type: String,
    },
    pregentAddress: {
      type: String,
      required: true,
    },
    parmanentAddress: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ['O+', 'O-', 'A+', 'A-', 'AB+', 'AB-', 'B+', 'B-'],
    },
    gurdian: {
      required: true,
      type: {
        father: {
          type: {
            fatherName: {
              type: String,
              required: true,
            },
            fatherOccupation: {
              type: String,
              required: true,
            },
            fatherContact: {
              type: String,
              required: true,
            },
            address: {
              type: String,
              required: true,
            },
          },
        },
        mother: {
          type: {
            motherName: {
              type: String,
              required: true,
            },
            motherOccupation: {
              type: String,
              required: true,
            },
            motherContact: {
              type: String,
              required: true,
            },
            address: {
              type: String,
              required: true,
            },
          },
        },
      },
    },
    localGurdian: {
      required: true,
      type: {
        localGurdianName: {
          type: String,
          required: true,
        },
        localGurdianOccupation: {
          type: String,
          required: true,
        },
        localGurdianContact: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Student = model<IStudent, StudentModel>('Student', studentSchema)
