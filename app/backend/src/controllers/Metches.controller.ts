import { Request, Response } from 'express';
import { IMatches } from '../Interfaces/matches/IMatches';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const { status, data } = await this.matchesService.findAll();
    console.log(inProgress);

    if (inProgress) {
      const inProgressBoolean = inProgress === 'true';
      const matchesInProgress = JSON.parse(JSON.stringify(data))
        .filter((match: IMatches) => match.inProgress === inProgressBoolean);
      return res.status(mapStatusHTTP(status)).json(matchesInProgress);
    }
    return res.status(mapStatusHTTP(status)).json(data);
  }
}