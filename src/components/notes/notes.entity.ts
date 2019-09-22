import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notes {
  constructor(id_user, note){
    this.id_user = id_user;
    this.note = note;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_user: number;

  @Column('text')
  note: string;
}