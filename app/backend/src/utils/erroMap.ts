import { Code } from './http.exception';

const mapError = (type: string): number => {
  if (type.includes('fields')) return Code.BAD_REQUEST;
  if (type.includes('Incorrect email or password')) return Code.UNAUTHORIZED;
  return Code.OK;
};

export default mapError;
