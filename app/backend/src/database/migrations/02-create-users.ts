import { Model, QueryInterface, DataTypes } from "sequelize";
import { IUser } from "../../Interfaces/users/IUser";

export default {
  up(QueryInterface: QueryInterface) {
    return QueryInterface.createTable<Model<IUser>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })
  },
  down(QueryInterface: QueryInterface) {
    return QueryInterface.dropTable('users');
   }
}