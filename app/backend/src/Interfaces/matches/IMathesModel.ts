import { IMatches } from './IMatches';
import { ITeam } from '../teams/ITeam';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  findByIdUpdate(id: number): Promise<void>;
  findByIdUpdateGol(id: number,
    homeTeamGoals: number, awayTeamGoals: number): Promise<void>;
  create(match: IMatches): Promise<IMatches>;
  findByTeamId(id: number): Promise<ITeam | null>;
  // getAllTeams(): Promise<ITeam[] | undefined>;
  getAllTeamsPoints(): Promise<ITeam[] | undefined>;
  getAllTeamsPointsInProgress(): Promise<ITeam[] | undefined>;
  getAllTeamsPointsAway(): Promise<ITeam[] | undefined>;
}
