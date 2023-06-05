import { IGenericHandlerMessage } from './error'

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessage: IGenericHandlerMessage[]
}
