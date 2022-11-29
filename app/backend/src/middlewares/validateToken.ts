import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const result = jwt.verify(authorization, process.env.JWT_SECRET as string);

      if (!result) return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
