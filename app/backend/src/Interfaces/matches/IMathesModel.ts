import { IMatches } from './IMatches';
import { ITeam } from '../teams/ITeam';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  findByIdUpdate(id: number): Promise<IMatches | null>;
  findByIdUpdateGol(id: number,
    homeTeamGoals: number, awayTeamGoals: number): Promise<IMatches | null>;
  create(match: IMatches): Promise<IMatches>;
  findByTeamId(id: number): Promise<ITeam | null>;
}
