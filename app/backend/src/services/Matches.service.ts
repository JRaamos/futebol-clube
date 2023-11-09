import MatchesModel from '../models/MetchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchesModel } from '../Interfaces/matches/IMathesModel';
import { IMatches } from '../Interfaces/matches/IMatches';
import { ITeam } from '../Interfaces/teams/ITeam';

type match = {
  message: string;
};
export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.findAll();
    return {
      status: 'SUCCESSFUL',
      data: matches,
    };
  }

  public async findByIdUpdate(id: number): Promise<ServiceResponse<match | null>> {
    await this.matchesModel.findByIdUpdate(id);
    return {
      status: 'SUCCESSFUL',
      data: { message: 'Finished' },
    };
  }

  public async findByIdUpdateGol(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<match | null>> {
    await this.matchesModel.findByIdUpdateGol(id, homeTeamGoals, awayTeamGoals);
    return {
      status: 'SUCCESSFUL',
      data: { message: 'Goooooool' },
    };
  }

  public async findByTeamId(id: number): Promise<ITeam | null> {
    const team = await this.matchesModel.findByTeamId(id);

    return team || null;
  }

  public async create(match: IMatches): Promise<ServiceResponse<IMatches>> {
    const { homeTeamId, awayTeamId } = match;
    const homeTeam = await this.findByTeamId(homeTeamId);
    const awayTeam = await this.findByTeamId(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }

    const newMatch = await this.matchesModel.create(match);
    return {
      status: 'CREATED',
      data: newMatch,
    };
  }

  public async getAllTeamsPoints(): Promise<ServiceResponse<ITeam[]>> {
    const totalPoints = await this.matchesModel.getAllTeamsPoints();
    if (totalPoints === undefined) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }
    return {
      status: 'SUCCESSFUL',
      data: totalPoints,
    };
  }
}
