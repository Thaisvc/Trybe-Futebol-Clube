import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/http.exception';

const httpErrorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode, message } = err as HttpException;
  if (statusCode) {
    return res.status(statusCode || 500).json({ message });
  }
  next();
};

export default httpErrorMiddleware;
