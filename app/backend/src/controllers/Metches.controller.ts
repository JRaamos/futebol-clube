import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async findAll(req: Request, res: Response) {
    const { status, data } = await this.matchesService.findAll();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
