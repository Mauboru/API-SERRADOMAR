import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { User } from './User';

class AccessLog extends Model {
  public id!: number;
  public user_id!: number;
  public ip_address!: string;
  public user_agent!: string;
  public access_time!: Date;
  public success!: boolean;
}

AccessLog.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    access_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    success: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'access_logs',
    timestamps: false,
  }
);

export default AccessLog;
