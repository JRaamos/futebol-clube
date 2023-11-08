import * as jwt from 'jsonwebtoken';

interface TokenPayload {
  email: string;
  password: string;
}

const secret = 'mysecretkey';

const generateToken = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

const verifyToken = (token: string): TokenPayload => {
  const data = jwt.verify(token, secret) as TokenPayload;
  return data;
};

export {
  generateToken,
  verifyToken,
};
