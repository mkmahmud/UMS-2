import {
  IAcademicFacultyMonth,
  IAcademicFacultyTitle,
  IAcademicFacultyCode,
} from './academicFaculty.interface'

export const AcademicFacultyMonth: IAcademicFacultyMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const AcademicFacultyTitle: IAcademicFacultyTitle[] = [
  'Faculty of business administration',
  'Faculty of Computer Science',
]

export const AcademicFacultyCode: IAcademicFacultyCode[] = ['01', '02', '03']

export const AcademicFacultyTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summar: '02',
  Fall: '03',
}

export const searchFileds = ['title', 'code', 'year']

export const filterAbleFilds = ['searchTerm', 'title', 'code', 'year']
