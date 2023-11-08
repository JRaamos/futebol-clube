import { Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.utils';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UsersService from '../services/Users.service';

export default class UsersController {
  constructor(
    private usersService = new UsersService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.usersService.findByEmailPassword(email, password);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async findByEmail(req: Request, res: Response) {
    const { authorization } = req.headers;

    const token = authorization?.split(' ')[1];

    const userCode = verifyToken(token);

    const { status, data } = await this.usersService.findByEmail(userCode.email);
    return res.status(mapStatusHTTP(status)).json({ role: data });
  }
}
