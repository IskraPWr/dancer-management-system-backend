import { Installment } from './instrallmentDate.entity';
import { Injectable, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InstallmentDateService {
  constructor(
    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,
  ) {}

  async findAll(): Promise<Installment[]> {
    return await this.installmentRepository.find();
  }
}
