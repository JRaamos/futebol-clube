import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  findByIdUpdate(id: number): Promise<IMatches | null>;
  findByIdUpdateGol(id: number,
    homeTeamGoals: number, awayTeamGoals: number): Promise<IMatches | null>;
}
