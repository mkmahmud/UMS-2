import { Model } from 'mongoose'

export type IAcademicFacultyMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type IAcademicFacultyTitle =
  | 'Faculty of business administration'
  | 'Faculty of Computer Science'
export type IAcademicFacultyCode = '01' | '02' | '03'

export type IAcademicFaculty = {
  title: IAcademicFacultyTitle
}

export type AcademicFacultyModel = Model<IAcademicFaculty>

export type IAcademicFacultyFillters = { searchTerm: string }
