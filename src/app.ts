import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import { UserRoutes } from './app/Modules/users/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import ApiError from './Errors/ApiErrors'
// Cors
app.use(cors())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application ROutes
app.use('/api/v1/users/', UserRoutes)

// testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // res.send('Server is runing')
  // throw new ApiError(400, 'Pre baba error')
  Promise.reject(new Error('Uhaled Promise Rejection'))
  // next('Ore Baba Error Next')
})

// Global testing
app.use(globalErrorHandler)

export default app
