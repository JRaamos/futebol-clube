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

  async findById(id: number): Promise<Matches | null> {
    const match = await this.model.findOne({
      where: {
        id,
      },
    });

    return match;
  }
}
