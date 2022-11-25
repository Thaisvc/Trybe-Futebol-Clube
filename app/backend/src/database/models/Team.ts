import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init({
  id: {
    type: INTEGER(),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(),
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'Team',
  tableName: 'teams',
});

export default Team;
