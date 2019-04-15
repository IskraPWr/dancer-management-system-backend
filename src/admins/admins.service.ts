import { Admins } from './admins.entity';
import { Injectable, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admins)
    private readonly adminsRepository: Repository<Admins>,
  ) {}

  async findAll(): Promise<Admins[]> {
     return await this.adminsRepository.find();
  }
}
