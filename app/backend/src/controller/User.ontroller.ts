import { Request, Response } from 'express';
import { createToken } from '../utils/token';
import ServiceUser from '../services/User.service';

export default class UsersController {
  static async LoginUser(req: Request, res:Response) {
    const user = req.body;
    const checkedUser = await ServiceUser.login(user);
    if (!checkedUser) return res.status(401).json({ message: 'Incorrect email or password' });
    const token = createToken(checkedUser);
    res.status(200).json({ token });
  }
}
