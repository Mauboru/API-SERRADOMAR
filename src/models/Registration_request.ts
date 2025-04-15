import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import { User } from './User';

class RegistrationRequest extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public requested_role!: 'guest' | 'user';
  public requested_at!: Date;
  public approved!: boolean;
  public approved_by!: number;
  public approved_at!: Date;
}

RegistrationRequest.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    requested_role: {
      type: DataTypes.ENUM('guest', 'user'),
      allowNull: false,
      defaultValue: 'user',
    },
    requested_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    approved_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    approved_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'registration_requests',
    timestamps: false,
  }
);

export default RegistrationRequest;
