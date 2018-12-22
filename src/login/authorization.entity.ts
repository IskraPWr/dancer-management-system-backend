import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Authorization {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column('text')
  login: string;

  @Column('text')
  password: string;
}