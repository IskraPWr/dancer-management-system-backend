import { Authorization } from './authorization.entity';
import { Injectable, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectRepository(Authorization)
    private readonly authorizationRepository: Repository<Authorization>,
  ) {}

  async findAll(): Promise<Authorization[]> {
     return await this.authorizationRepository.find();
  }
}
