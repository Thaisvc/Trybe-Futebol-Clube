import { Request, Response } from 'express';
import ServiceUser from '../services/User.service';

export default class UsersController {
  static async LoginUser(req: Request, res:Response) {
    const user = req.body;

    const checkedUser = await ServiceUser.login(user);
    if (!checkedUser) return res.status(401).json({ message: 'Incorrect email or password' });
    res.status(200).json({ token: checkedUser });
  }

  static async checkedUser(req: Request, res:Response) {
    // console.log(req.headers.authorization);
    const verifyUser = await ServiceUser.validate(req.headers.authorization);
    /*  console.log(verifyUser, 'lll');
    if (!verifyUser) return res.status(400).json(verifyUser); */
    res.status(200).json(verifyUser);
  }
}
