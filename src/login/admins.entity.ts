import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admins {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  login: string;

  @Column('text')
  password: string;
}