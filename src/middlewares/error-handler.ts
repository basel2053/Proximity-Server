import { type NextFunction, type Request, type Response } from 'express';

import { CustomError } from '../errors/custom-error';

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction): void | Response => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  console.log(err);

  res.status(400).send({ errors: [{ message: 'Something went wrong.' }] });
};

export default errorHandler;
