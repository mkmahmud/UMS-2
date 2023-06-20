"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterAbleFilds = exports.searchFileds = exports.AcademicSemesterTitleCodeMapper = exports.AcademicSemesterCode = exports.AcademicSemesterTitle = exports.AcademicSemesterMonth = void 0;
exports.AcademicSemesterMonth = [
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
exports.AcademicSemesterTitle = [
    'Autumn',
    'Summar',
    'Fall',
];
exports.AcademicSemesterCode = ['01', '02', '03'];
exports.AcademicSemesterTitleCodeMapper = {
    Autumn: '01',
    Summar: '02',
    Fall: '03',
};
exports.searchFileds = ['title', 'code', 'year'];
exports.filterAbleFilds = ['searchTerm', 'title', 'code', 'year'];
