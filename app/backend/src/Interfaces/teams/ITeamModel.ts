import { ITeam } from './ITeam';

export interface ITeamsModel {
  findAll(): Promise<ITeam[]>;
  findById(id: number): Promise<ITeam | null>;
}
