import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  findByIdUpdate(id: number): Promise<IMatches | null>;
}
