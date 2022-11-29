import { compareSync } from 'bcryptjs';
import { IUsers } from '../interfeces/IUser';
import ModelUser from '../database/models/User';
import { createToken } from '../utils/token';

export default class UserService {
  public static async login(userLogin: IUsers): Promise<string | boolean> {
    const { email, password } = userLogin;

    const checkUser = await ModelUser.findOne({ where: { email } });

    const checkPassword = checkUser && compareSync(password, checkUser.password);
    console.log(checkUser);

    if (checkPassword) {
      const checked = {
        id: checkUser.id,
        username: checkUser.username,
        role: checkUser.role,
        email: checkUser.email,
      };
      return createToken(checked);
    }

    return false;
  }
}
