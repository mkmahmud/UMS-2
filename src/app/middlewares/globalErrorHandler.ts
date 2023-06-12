import { ErrorRequestHandler } from 'express'
import configure from '../../configure'
import { IGenericHandlerMessage } from '../../interfaces/error'
import handelValiditionError from '../../Errors/handelValiditionError'
import { ZodError } from 'zod'
import ApiError from '../../Errors/ApiErrors'
import { errorLogger } from '../../shared/logger'
import handelZodError from '../../Errors/handelZodError'
import handelCasrError from '../../Errors/handelCasrError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res) => {
  // eslint-disable-next-line no-unused-expressions
  configure.env === 'development'
    ? // eslint-disable-next-line no-console
      console.log('GlobalErrorHandler ~', error)
    : errorLogger.error('GlobalErrorHandler ~', error)

  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessage: IGenericHandlerMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handelValiditionError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
  } else if (error instanceof ZodError) {
    const simplifiedError = handelZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
  } else if (error?.name === 'CastError') {
    const simplifiedError = handelCasrError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
    // res.status(200).json({ error })
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: configure.env !== 'production' ? error?.stack : undefined,
  })
}

export default globalErrorHandler
