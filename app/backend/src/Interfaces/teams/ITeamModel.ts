import { ITeam } from './ITeam';

export interface ITeamsModel {
  findAll(): Promise<ITeam[]>;
}
