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

  async getAllTeamsPoints(): Promise<ITeamWithPoints[] | undefined> {
    const stats = await this.teamsModel.findAll({ include: [{
      model: Match, as: 'HomeMatches', attributes: [], where: { inProgress: false } }],
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

  async getAllTeamsPointsAway(): Promise < ITeamWithPoints[] | undefined > {
    const stats = await this.teamsModel.findAll({ include: [{
      model: Match,
      as: 'AwayMatches',
      attributes: [],
      where: { inProgress: false } }],
    attributes: [['team_name', 'name'],
      [Sequelize.fn('COUNT', Sequelize.col('AwayMatches.id')), 'totalGames'],
      [Sequelize.fn('SUM', Sequelize.col(AwayMatchesQuery.awayGols)), 'goalsFavor'],
      [Sequelize.fn('SUM', Sequelize.col(AwayMatchesQuery.homeGols)), 'goalsOwn'],
      [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN ${AwayMatchesQuery.awayGols} > 
        ${AwayMatchesQuery.homeGols} THEN 1 ELSE 0 END`)), 'totalVictories'],
      [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN ${AwayMatchesQuery.awayGols} =
          ${AwayMatchesQuery.homeGols} THEN 1 ELSE 0 END`)), 'totalDraws'],
      [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN ${AwayMatchesQuery.awayGols} <
          ${AwayMatchesQuery.homeGols} THEN 1 ELSE 0 END`)), 'totalLosses']],
    group: ['teams.id'],
    raw: true });
    return MatchesModel.handleConvertedStats(stats as unknown as ITeamWithPoints[]);
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
}
