import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Installment {
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