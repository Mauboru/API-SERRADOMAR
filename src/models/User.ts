import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';
import bcrypt from 'bcrypt';

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public cpf!: string;
  public role!: 'guest' | 'user' | 'manager';
  public status!: 'pending' | 'active' | 'inactive';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  public static hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  public static isPasswordValid(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
      validate: {
        is: /^[0-9]{11}$/i,
      },
    },
    role: {
      type: DataTypes.ENUM('guest', 'user', 'manager'),
      allowNull: false,
      defaultValue: 'user',
    },
    status: {
      type: DataTypes.ENUM('pending', 'active', 'inactive'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    paranoid: true, // Isso ativa o deletedAt
  }
);
