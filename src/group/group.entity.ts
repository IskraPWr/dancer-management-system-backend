import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_semester: number;

  @Column('text')
  name: string;

  @Column('int')
  day: number;

  @Column('datetime')
  start: Date;

  @Column('datetime')
  end: Date;

}