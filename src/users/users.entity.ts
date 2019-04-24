import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  constructor(hashPass, name, surname, login, gender, email, phone, university, year, index, key1, key2){
    this.name = name;
    this.surname = surname;
    this.login = login;
    this.password = hashPass;
    this.gender = gender;
    this.email = email;
    this.phone = phone;
    this.university = university;
    this.year = year;
    this.index = index;
    this.key1 = key1;
    this.key2 = key2;
    this.status = true;
    this.join_date = new Date();
  }
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column('text')
  name: string;

  @Column('text')
  surname: string;

  @Column('text')
  login: string;

  @Column('text')
  password: string;

  @Column('int')
  declaration: number;

  @Column('int')
  gender: number;

  @Column('text')
  email: string;

  @Column('text')
  phone: string;

  @Column('text')
  university: string;

  @Column('text')
  department: string;

  @Column('int')
  year: number;

  @Column('text')
  index: string;

  @Column('text')
  key1: string;

  @Column('text')
  key2: string;

  @Column()
  status: boolean;

  @Column('datetime')
  join_date: Date;
}