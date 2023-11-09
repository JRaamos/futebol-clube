import Teams from '../database/models/TeamsModel';
import { IMatchesModel } from '../Interfaces/matches/IMathesModel';
import Matches from '../database/models/MetchesModel';

export default class MatchesModel implements IMatchesModel {
  private model = Matches;

  async findAll(): Promise<Matches[]> {
    const matchesWithTeams = await this.model.findAll({
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matchesWithTeams;
  }

  async findByIdUpdate(id: number): Promise<Matches | null> {
    const match = await this.model.update(
      { inProgress: false },
      { where: { id }, returning: true },
    );

    return match[1][0];
  }

  async findByIdUpdateGol(id: number, homeTeamGoals:
  number, awayTeamGoals: number): Promise<Matches | null> {
    const match = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id }, returning: true },
    );

    return match[1][0];
  }

  async create(match: Matches): Promise<Matches> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;
    const newMatchObject = {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    };

    const newMatch = await this.model.create(newMatchObject);
    return newMatch;
  }
}
