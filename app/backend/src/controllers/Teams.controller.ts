import { Request, Response } from 'express';
import TeamsService from '../services/Teams.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAllTeams(req: Request, res: Response) {
    const { status, data } = await this.teamsService.getAllTeams();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
