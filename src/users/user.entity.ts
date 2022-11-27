import {
  Table,
  Column,
  Model,
  AutoIncrement,
  PrimaryKey
} from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  email: string;

  @Column
  password: string;
}
