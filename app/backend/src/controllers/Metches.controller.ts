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

    if (inProgress) {
      const inProgressBoolean = inProgress === 'true';
      const matchesInProgress = JSON.parse(JSON.stringify(data))
        .filter((match: IMatches) => match.inProgress === inProgressBoolean);
      return res.status(mapStatusHTTP(status)).json(matchesInProgress);
    }
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async findByIdUpdate(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchesService.findByIdUpdate(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async findByIdUpdateGol(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchesService.findByIdUpdateGol(
      Number(id),
      homeTeamGoals,
      awayTeamGoals,
    );
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async create(req: Request, res: Response) {
    const match: IMatches = req.body;
    const { status, data } = await this.matchesService.create(match);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getAllTeamsPoints(req: Request, res: Response) {
    const { status, data } = await this.matchesService.getAllTeamsPoints();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getAllTeamsPointsAway(req: Request, res: Response) {
    const { status, data } = await this.matchesService.getAllTeamsPointsAway();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getAllTeamsPointsInProgress(req: Request, res: Response) {
    const { status, data } = await this.matchesService.getAllTeamsPointsInProgress();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
