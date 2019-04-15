import { Installments } from './installment.entity';
import { Injectable, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class InstallmentService {
  constructor(
    @InjectRepository(Installments)
    private readonly installmentsRepository: Repository<Installments>,
  ) {}

  async findAll(): Promise<Installments[]> {
     return await this.installmentsRepository.find();
  }

  async findType0(): Promise<Installments[]> {
    return await this.installmentsRepository.find({type: 0});
 }

 async findType1(): Promise<Installments[]> {
    return await this.installmentsRepository.find({type: 1});
 }

 async removeDate(idArray) {
   idArray.id = idArray.id.split(',');
   return await Promise.resolve(
     idArray.id.forEach(element => {
       Promise.resolve(
         this.installmentsRepository.delete({
           id: element
         })
       )
     }),
   );
 }

 async changeDate(message) {
   return await this.installmentsRepository.update(
     {
       id: message.id,
     },
     {
       [message.name]: message.value
     },
   );
 }

 async addDate(message) {
   return await Promise.resolve()
     .then(() => {
       const ent = this.installmentsRepository.create(
         new Installments (
            message.name,
            message.installment_1,
            message.installment_2,
            message.installment_3,
            message.type
          ),
        );
       this.installmentsRepository.insert(ent);
     })
     .catch(er => {
       console.log(er);
     });
 }
}
