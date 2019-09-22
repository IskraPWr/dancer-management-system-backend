import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Installments {
  constructor (name, installment_1,  installment_2 ,installment_3, type ){
    this.name = name;
    this.installment_1 = installment_1;
    this.installment_2 = installment_2;
    this.installment_3 = installment_3;
    this.type = type;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('int')
  installment_1: number;

  @Column('int')
  installment_2: number;

  @Column('int')
  installment_3: number;

  @Column('int')
  type: number;

}