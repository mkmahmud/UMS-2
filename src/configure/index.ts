/* eslint-disable no-undef */
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  PORT: process.env.PORT,
  SERVER_URL: process.env.SERVER_URL,
  D_USER_PASSWORD: process.env.D_USER_PASSWORD,
  DEFUALT_STUDENT_PASSWORD: process.env.DEFUALT_STUDENT_PASSWORD,
  DEFAULT_FACULTY_PASS: process.env.DEFAULT_FACULTY_PASS,
  DEFAULT_ADMIN_PASS: process.env.DEFAULT_ADMIN_PASS,
  JWT_SECRET :process.env.JWT_SECRET,
  JWT_EXPIRES:process.env.JWT_EXPIRES,
  JWT_REFRESH_SCREET:process.env.JWT_REFRESH_SCREET,
  JWT_REFRESH_EXPIERES_IN:process.env.JWT_REFRESH_EXPIERES_IN
}
