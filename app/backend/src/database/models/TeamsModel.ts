import { DataTypes, Model, InferAttributes,
  InferCreationAttributes, CreationOptional } from 'sequelize';
import db from '.';

class Teams extends Model<InferAttributes<Teams>, InferCreationAttributes<Teams>> {
  [x: string]: any;
  declare id: CreationOptional<number>;
  declare teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

export default Teams;
