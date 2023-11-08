import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.utils';

const INVALID_TOKEN = 'Token must be a valid token';
class JWT {
  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({ message: INVALID_TOKEN });
    }

    try {
      const token = authorization.split(' ')[1];
      verifyToken(token);
      next();
    } catch (error) {
      return res.status(401).json({ message: INVALID_TOKEN });
    }
  };
}

export default JWT;
