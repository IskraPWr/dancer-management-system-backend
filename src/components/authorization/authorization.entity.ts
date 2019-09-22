import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Authorization {
  constructor(name, surname, email, login, password){
    this.name = name;
    this.surname = surname;
    this.email = email;
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
  email: string;

  @Column('text')
  login: string;

  @Column('text')
  password: string;
}