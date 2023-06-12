import {
  IAcademicSemesterMonth,
  IAcademicSemesterTitle,
  IAcademicSemesterCode,
} from './academicSemester.interface'

export const AcademicSemesterMonth: IAcademicSemesterMonth[] = [
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

export const AcademicSemesterTitle: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summar',
  'Fall',
]

export const AcademicSemesterCode: IAcademicSemesterCode[] = ['01', '02', '03']

export const AcademicSemesterTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summar: '02',
  Fall: '03',
}

export const searchFileds = ['title', 'code', 'year']

export const filterAbleFilds = ['searchTerm', 'title', 'code', 'year']
