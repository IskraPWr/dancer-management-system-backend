import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Presence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_user: number;

  @Column('datetime')
  time: string;
}