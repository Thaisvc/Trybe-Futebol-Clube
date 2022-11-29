import { compareSync } from 'bcryptjs';
import HttpException from '../utils/http.exception';
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
    const checkedToken = Token.validateToken(user, next);
    if (!checkedToken) { throw new HttpException(404, 'User not found'); }

    const findUser = await ModelUser.findByPk(checkedToken.id, { attributes: ['role'] });
    return findUser;
  }
}
