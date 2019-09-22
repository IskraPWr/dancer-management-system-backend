import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Installment {
  id: any;
  constructor (name, start, date_1, date_2, date_3, end){
    this.name = name;
    this.start = new Date(start);
    this.date_1 = new Date(date_1);
    this.date_2 = new Date(date_2);
    this.date_3 = new Date(date_3);
    this.end = new Date(end);
  }
  @PrimaryGeneratedColumn()
  id_semester: number;

  @Column('text')
  name: string;

  @Column('datetime')
  start: Date;

  @Column('datetime')
  date_1: Date;

  @Column('datetime')
  date_2: Date;

  @Column('datetime')
  date_3: Date;

  @Column('datetime')
  end: Date;

}