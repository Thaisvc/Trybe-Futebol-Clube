import { compareSync } from 'bcryptjs';
import { IUsers } from '../interfeces/IUser';
import ModelUser from '../database/models/User';
import Token from '../utils/token';

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
      return Token.createToken(checked);
    }

    return false;
  }

  public static async validate(user: any | undefined): Promise<any> {
    const { data } = Token.authentication(user);
    const { id } = data;

    if (!id) {
      return { status: 401, message: { message: 'Unauthorized' } };
    }

    const result = await ModelUser.findByPk(id, { attributes: ['role'] });

    if (!result) {
      return { status: 401, message: { message: 'Unauthorized' } };
    }

    return { role: result.role };
  }
}
