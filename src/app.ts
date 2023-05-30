import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'

// Cors
app.use(cors())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Server is runing')
})

export default app
