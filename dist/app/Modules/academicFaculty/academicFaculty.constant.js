"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterAbleFilds = exports.searchFileds = exports.AcademicFacultyTitleCodeMapper = exports.AcademicFacultyCode = exports.AcademicFacultyTitle = exports.AcademicFacultyMonth = void 0;
exports.AcademicFacultyMonth = [
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
];
exports.AcademicFacultyTitle = [
    'Faculty of business administration',
    'Faculty of Computer Science',
];
exports.AcademicFacultyCode = ['01', '02', '03'];
exports.AcademicFacultyTitleCodeMapper = {
    Autumn: '01',
    Summar: '02',
    Fall: '03',
};
exports.searchFileds = ['title', 'code', 'year'];
exports.filterAbleFilds = ['searchTerm', 'title', 'code', 'year'];
