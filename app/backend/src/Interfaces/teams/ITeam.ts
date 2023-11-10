export interface ITeam {
  id: number,
  teamName: string,
}

export interface ITeamWithPoints extends ITeam {
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}
