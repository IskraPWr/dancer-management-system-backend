import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  id_transaction: number;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  product: string;

  @Column('datetime')
  date: string;

  @Column('int')
  quantity: number;

  @Column('int')
  price: number;

  @Column('int')
  sum: number;
}