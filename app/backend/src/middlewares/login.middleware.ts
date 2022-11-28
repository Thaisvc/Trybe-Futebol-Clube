import { NextFunction, Request, Response } from 'express';

export default class UsersMiddlewares {
  public static LoginValid(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (email && password) {
      next();
    } else {
      res.status(400).json({ message: 'All fields must be filled' });
    }
  }
}
