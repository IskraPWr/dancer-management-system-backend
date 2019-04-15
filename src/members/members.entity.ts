import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Members {
  constructor(id_user, id_group){
    this.id_user = id_user;
    this.id_group = id_group;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_group: number;

  @Column('int')
  id_user: number;

}