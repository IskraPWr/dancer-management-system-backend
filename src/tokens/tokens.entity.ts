import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tokens {
    constructor(token: string, role: number, id){
        this.token = token;
        this.id_user = id;
        this.role = role;
        this.date = new Date();
    }
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_user: number;

  @Column('text')
  token: string;

  @Column('int')
  role: number;

  @Column('datetime')
  date: Date;

}