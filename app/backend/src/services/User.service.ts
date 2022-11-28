import { compareSync } from 'bcryptjs';
import { IJwt, IUsers } from '../interfeces/IUser';
import ModelUser from '../database/models/User';

export default class UserService {
  public static async login(userLogin: IUsers): Promise<IJwt | boolean> {
    const { email, password } = userLogin;

    const user = await ModelUser.findOne({ where: { email } });
    if (!user) {
      throw new Error('User already exists');
    }

    const checkPassword = user && compareSync(password, user.password);

    if (checkPassword) {
      return {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      };
    }

    return false;
  }
}
