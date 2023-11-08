import { ITeamsModel } from '../Interfaces/teams/ITeamModel';
import Teams from '../database/models/TeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = Teams;

  async findAll(): Promise<Teams[]> {
    const teams = await this.model.findAll();

    return teams;
  }

  async findById(id: number): Promise<Teams | null> {
    const team = await this.model.findOne({
      where: {
        id,
      },
    });

    return team;
  }
}
