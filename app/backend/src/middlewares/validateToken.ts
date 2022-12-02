import { NextFunction, Request, Response } from 'express';
import Token from '../utils/token';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.header('authorization');

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    if (authorization) {
      const result = Token.authent(authorization);

      if (!result) return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
