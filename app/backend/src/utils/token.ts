import { config } from 'dotenv';
import { verify, sign } from 'jsonwebtoken';
import { NextFunction } from 'express';
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

  static validateToken = (token: string, next: NextFunction) => {
    try {
      const { data } = verify(token, String(process.env.JWT_SECRET)) as IToken;

      return data;
    } catch (error) {
      return next({ status: 401, message: 'Token must be a valid token' });
    }
  };
}

export default
Token;
