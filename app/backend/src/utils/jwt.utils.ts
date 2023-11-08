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

const verifyToken = (token: string | undefined): TokenPayload => {
  if (!token) {
    return null as unknown as TokenPayload;
  }

  const data = jwt.verify(token, secret) as unknown as TokenPayload;
  return data;
};

export {
  generateToken,
  verifyToken,
};
