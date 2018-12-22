import { Notes } from './notes.entity';
import { Injectable, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
  ) {}

  async findAllFromActiveUsers(): Promise<Notes> {
    // tslint:disable-next-line:max-line-length
    return await this.notesRepository.query('SELECT DISTINCT `notes`.`note`, `notes`.`id_user` FROM `users`, `notes`, `presence` WHERE `users`.`id_user` = `presence`.`id_user` AND `users`.`status` = 1 AND `users`.`id_user`= `notes`.`id_user` ORDER BY `notes`.`id_user` ASC');
  }

  async findAll(): Promise<any> {
    // tslint:disable-next-line:max-line-length
    return await this.notesRepository.query('SELECT `notes`.`id_user`, `notes`.`note` FROM `notes`, `users` WHERE `users`.`id_user` = `notes`.`id_user` AND `users`.`status` = 1 ORDER BY `notes`.`id_user` ASC');
  }

}
