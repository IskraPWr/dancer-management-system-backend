import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column('text')
  name: string;

  @Column('text')
  surname: string;

  @Column('int')
  declaration: number;

  @Column('int')
  gender: number;

  @Column('text')
  email: string;

  @Column('text')
  phone: string;

  @Column('text')
  university: string;

  @Column('text')
  department: string;

  @Column('int')
  year: number;

  @Column('text')
  index: string;

  @Column('text')
  key1: string;

  @Column('text')
  key2: string;

  @Column()
  status: boolean;

  @Column('datetime')
  join_date: Date;
}