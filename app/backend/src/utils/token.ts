import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
import * as JWT from 'jsonwebtoken';
import { IJwt, IToken } from '../interfeces/IUser';

config();

class Token {
  static createToken(data: IJwt | boolean) {
    const token = sign({ data }, String(process.env.JWT_SECRET), {
      expiresIn: '1d',
      algorithm: 'HS256',
    });

    return token;
  }

  static authentication = (token: string) => {
    const credential = JWT.verify(token, String(process.env.JWT_SECRET));

    return credential as IToken;
  };
}

export default
Token;
