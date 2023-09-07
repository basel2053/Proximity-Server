import { CustomError } from './customError'

export class NotFoundError extends CustomError {
  statusCode = 404
  constructor () {
    super('Route Not Found')
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors (): Array<{ message: string }> {
    return [{ message: 'Not Found' }]
  }
}
