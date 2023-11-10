import { Sequelize } from 'sequelize';
import { IMatchesModel } from '../Interfaces/matches/IMathesModel';

import { ITeamWithPoints } from '../Interfaces/teams/ITeam';
import { Teams, Match } from '../database/models/Associations';

const HomeMatchesQuery = {
  homeGols: 'HomeMatches.home_team_goals',
  awayGols: 'HomeMatches.away_team_goals',
};
const AwayMatchesQuery = {
  homeGols: 'AwayMatches.home_team_goals',
  awayGols: 'AwayMatches.away_team_goals',
};

export default class MatchesModel implements IMatchesModel {
  private model = Match;
  private teamsModel = Teams;

  async findAll(): Promise<Match[]> {
    const matchesWithTeams = await this.model.findAll({
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matchesWithTeams;
  }

  async findByIdUpdate(id: number): Promise<void> {
    await this.model.update(
      { inProgress: false },
      { where: { id }, returning: true },
    );
  }

  async findByIdUpdateGol(id: number, homeTeamGoals:
  number, awayTeamGoals: number): Promise<void> {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id }, returning: true },
    );
  }

  async create(match: Match): Promise<Match> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;
    const newMatchObject = {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    };

    const newMatch = await this.model.create(newMatchObject);
    return newMatch;
  }

  async findByTeamId(id: number): Promise<Teams | null> {
    const team = await this.teamsModel.findByPk(id);
    return team;
  }

  async getAllTeamsPoints(inProgress = false): Promise<ITeamWithPoints[] | undefined> {
    const stats = await this.teamsModel.findAll({ include: [{
      model: Match, as: 'HomeMatches', attributes: [], where: { inProgress } }],
    attributes: [['team_name', 'name'], [Sequelize.fn('COUNT', Sequelize.col('HomeMatches.id')),
      'totalGames'], [Sequelize.fn('SUM', Sequelize.col(HomeMatchesQuery.homeGols)), 'goalsFavor'],
    [Sequelize.fn('SUM', Sequelize.col(HomeMatchesQuery.awayGols)), 'goalsOwn'],
    [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN ${HomeMatchesQuery.homeGols} >
     ${HomeMatchesQuery.awayGols}   THEN 1 ELSE 0 END`)), 'totalVictories'],
    [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN ${HomeMatchesQuery.homeGols} = 
    ${HomeMatchesQuery.awayGols} THEN 1 ELSE 0 END`)), 'totalDraws'], [Sequelize.fn('SUM', Sequelize
      .literal(`CASE WHEN ${HomeMatchesQuery.homeGols} < ${HomeMatchesQuery.awayGols} THEN 1 ELSE 0 
      END`)), 'totalLosses'], [Sequelize.literal(`SUM(${HomeMatchesQuery.homeGols}) - 
      SUM(${HomeMatchesQuery.awayGols})`), 'goalsBalance'], [Sequelize.fn('SUM', Sequelize.literal(`
      CASE WHEN home_team_goals > away_team_goals THEN 3 WHEN home_team_goals = away_team_goals
       THEN 1 ELSE 0 END`)), 'totalPoints']],
    order: [[Sequelize.literal('totalPoints'), 'DESC'], [Sequelize.literal('goalsBalance'),
      'DESC'], [Sequelize.literal('goalsFavor'), 'DESC']],
    group: ['teams.id'],
    raw: true }); return MatchesModel.handleConvertedStats(stats as unknown as ITeamWithPoints[]);
  }

  async getAllTeamsPointsAway(inProgress = false): Promise < ITeamWithPoints[] | undefined > {
    const stats = await this.teamsModel.findAll({ include: [{
      model: Match, as: 'AwayMatches', attributes: [], where: { inProgress } }],
    attributes: [['team_name', 'name'], [Sequelize.fn('COUNT', Sequelize.col('AwayMatches.id')),
      'totalGames'], [Sequelize.fn('SUM', Sequelize.col(AwayMatchesQuery.awayGols)), 'goalsFavor'],
    [Sequelize.fn('SUM', Sequelize.col(AwayMatchesQuery.homeGols)), 'goalsOwn'],
    [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN ${AwayMatchesQuery.awayGols} > 
      ${AwayMatchesQuery.homeGols} THEN 1 ELSE 0 END`)), 'totalVictories'], [Sequelize
      .fn('SUM', Sequelize.literal(`CASE WHEN ${AwayMatchesQuery.awayGols} = 
      ${AwayMatchesQuery.homeGols} THEN 1 ELSE 0 END`)), 'totalDraws'],
    [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN ${AwayMatchesQuery.awayGols} <
          ${AwayMatchesQuery.homeGols} THEN 1 ELSE 0 END`)), 'totalLosses'], [Sequelize.literal(`SUM
          (${AwayMatchesQuery.awayGols}) -  SUM(${AwayMatchesQuery.homeGols})`), 'goalsBalance'],
    [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN away_team_goals > home_team_goals THEN 3 WHEN 
    away_team_goals = home_team_goals THEN 1 ELSE 0 END`)), 'totalPoints']],
    group: ['teams.id'],
    order: [[Sequelize.literal('totalPoints'), 'DESC'], [Sequelize.literal('goalsBalance'),
      'DESC'], [Sequelize.literal('goalsFavor'), 'DESC']],
    raw: true }); return MatchesModel.handleConvertedStats(stats as unknown as ITeamWithPoints[]);
  }

  static handleConvertedStats(stats: ITeamWithPoints[]) {
    const convertedStats = stats.map((team) => ({
      ...team,
      totalPoints: Number(team.totalPoints),
      totalGames: Number(team.totalGames),
      totalVictories: Number(team.totalVictories),
      totalDraws: Number(team.totalDraws),
      totalLosses: Number(team.totalLosses),
      goalsFavor: Number(team.goalsFavor),
      goalsOwn: Number(team.goalsOwn),
      goalsBalance: Number(team.goalsBalance),
      efficiency: Number(((team.totalPoints / (team.totalGames * 3)) * 100)).toFixed(2),
    }));
    return convertedStats;
  }

  private async auxiliarFunction(): Promise<ITeamWithPoints[]> {
    const homeGameFinish = await this.getAllTeamsPoints();
    const awayGameFinish = await this.getAllTeamsPointsAway();
    const combinedGame = [
      ...(homeGameFinish || []),
      ...(awayGameFinish || []),
    ];
    return combinedGame;
  }

  static initializeTeamStats(game: ITeamWithPoints): ITeamWithPoints {
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
      efficiency: '0', // Inicializa como string '0', que será calculado depois
    };
  }

  static updateTeamStats(
    teamStats: { [key: string]: ITeamWithPoints },
    game: ITeamWithPoints,
  ): { [key: string]: ITeamWithPoints } {
    const teamName = game.name;
    // Cria uma cópia do objeto de estatísticas para o time, se ele já existir, ou inicializa um novo
    const updatedTeamStats = teamStats[teamName]
      ? { ...teamStats[teamName] } : MatchesModel.initializeTeamStats(game);

    // Atualiza as estatísticas do time com os dados do jogo atual
    updatedTeamStats.totalGames += game.totalGames;
    updatedTeamStats.totalPoints += game.totalPoints;
    updatedTeamStats.totalVictories += game.totalVictories;
    updatedTeamStats.totalDraws += game.totalDraws;
    updatedTeamStats.totalLosses += game.totalLosses;
    updatedTeamStats.goalsFavor += game.goalsFavor;
    updatedTeamStats.goalsOwn += game.goalsOwn;
    updatedTeamStats.goalsBalance += game.goalsBalance;

    // Retorna um novo objeto com o time atualizado
    return {
      ...teamStats,
      [teamName]: updatedTeamStats,
    };
  }

  async getAllTeamsPointsInProgress(): Promise<ITeamWithPoints[] | undefined> {
    const allGames = await this.auxiliarFunction();
    let teamStats: { [key: string]: ITeamWithPoints } = {}; // Inicializa como let para permitir reatribuição

    allGames.forEach((game) => {
      teamStats = MatchesModel.updateTeamStats(teamStats, game); // Reatribui o resultado de volta ao teamStats
    });

    // Converter o objeto de estatísticas em um array e calcular a eficiência
    const combinedStats = Object.values(teamStats).map((team) => ({
      ...team,
      efficiency: ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2),
    }));

    // Ordenar os times com base em totalPoints, goalsBalance e goalsFavor
    combinedStats.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor);

    // Retornar os resultados finais
    return combinedStats;
  }
}
