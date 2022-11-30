import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    type: INTEGER(),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER(),
  },
  homeTeamGoals: {
    type: INTEGER(),
  },
  awayTeam: {
    type: INTEGER(),
  },
  awayTeamGoals: {
    type: INTEGER(),
  },
  inProgress: {
    type: BOOLEAN(),
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'Match',
  tableName: 'matches',
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatch' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayMatch' });

export default Match;
