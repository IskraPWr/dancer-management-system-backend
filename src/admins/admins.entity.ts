import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admins {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  surname: string;

  @Column('text')
  mail: string;

  @Column('text')
  login: string;

  @Column('text')
  password: string;
}