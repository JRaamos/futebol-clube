import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  // findById(id: number): Promise<IMatches | null>;
}
