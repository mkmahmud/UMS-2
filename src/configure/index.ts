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
}
