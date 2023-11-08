import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsModel from '../models/TeamsModel';
import { ITeamsModel } from '../Interfaces/teams/ITeamModel';
import { ITeam } from '../Interfaces/teams/ITeam';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: teams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam | null>> {
    const team = await this.teamsModel.findById(id);
    return { status: 'SUCCESSFUL', data: team };
  }
}
