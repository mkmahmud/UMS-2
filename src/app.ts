import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'
import router from './app/Modules/users/user.route'
// Cors
app.use(cors())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application ROutes
app.use('/api/v1/users/', router)

app.get('/', async (req: Request, res: Response) => {
  res.send('Server is runing')
})

export default app
