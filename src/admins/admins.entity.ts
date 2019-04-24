import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admins {
  constructor(name, surname, mail, login, password){
    this.name = name;
    this.surname = surname;
    this.mail = mail;
    this.login = login;
    this.password = password;
  }
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