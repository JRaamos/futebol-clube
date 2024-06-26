import { NextFunction, Request, Response } from 'express';

class ValidationsLogin {
  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const regexEmail = /[A-Za-z0-9]+@[A-Za-z]+\.com/;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!regexEmail.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}

export default ValidationsLogin;
