import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Group {
  constructor (id_semester, name, day, start, end){
    this.id_semester = id_semester;
    this.name = name;
    this.day = day;
    this.start = start;
    this.end = end;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_semester: number;

  @Column('text')
  name: string;

  @Column('int')
  day: number;

  @Column('time')
  start: string;

  @Column('time')
  end: string;

}