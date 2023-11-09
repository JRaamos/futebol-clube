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
}
