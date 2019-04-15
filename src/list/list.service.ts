import { List } from './../list/list.entity';
import { Injectable, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}
  async findAll(): Promise<List[]> {
    return await this.listRepository.query('SELECT * FROM `list` ORDER BY `list`.`date` DESC');
  }

  async findAllActive(): Promise<List[]> {
    // tslint:disable-next-line:max-line-length
    return await this.listRepository.query('SELECT `list`.* FROM `list`, `users` WHERE `list`.`email` = `users`.`email` AND `users`.`status` = 1 ORDER BY `list`.`id_transaction` ASC');
  }

  async findByEmail(mail): Promise<List[]> {
      return await this.listRepository.find({email: mail});
  }

  async findByName(nam): Promise<List> {
    return await this.listRepository.findOneOrFail({
      name : nam,
    });
  }

    async findById(id): Promise<List> {
      return await this.listRepository.findOneOrFail({
        id_transaction : id,
      });
    }
}
