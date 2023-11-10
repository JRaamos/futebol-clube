import { ITeamWithPoints } from '../Interfaces/teams/ITeam';

export default function initializeTeamStats(game: ITeamWithPoints): ITeamWithPoints {
  return {
    ...game,
    totalGames: 0,
    totalPoints: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '0',
  };
}
