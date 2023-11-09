// associations.ts
import Teams from './TeamsModel';
import Match from './MetchesModel';

Teams.hasMany(Match, { as: 'HomeMatches', foreignKey: 'homeTeamId' });
Teams.hasMany(Match, { as: 'AwayMatches', foreignKey: 'awayTeamId' });

Match.belongsTo(Teams, { as: 'homeTeam', foreignKey: 'homeTeamId' });
Match.belongsTo(Teams, { as: 'awayTeam', foreignKey: 'awayTeamId' });

export { Teams, Match };
