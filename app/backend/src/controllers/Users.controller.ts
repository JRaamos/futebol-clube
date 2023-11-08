import { Request, Response } from 'express';
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
}
