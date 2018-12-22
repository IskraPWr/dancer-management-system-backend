import { Presence } from './presence.entity';
import { Injectable, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PresenceService {
  constructor(
    @InjectRepository(Presence)
    private readonly presenceRepository: Repository<Presence>,
  ) {}

  async findAll(): Promise<Presence[]> {
    return await this.presenceRepository.query('SELECT * FROM `presence` ORDER BY `presence`.`id_user` ASC');
  }

  async findById(nr): Promise<Presence> {
      return await this.presenceRepository.query('SELECT * FROM `presence` WHERE `id` = ' + nr + ' ORDER BY `presence`.`time` ASC');
  }

  async findByTime(nr): Promise<Presence> {
    return await this.presenceRepository.findOneOrFail({
        time : nr,
    });
  }

  async findAllFromActiveUsers(): Promise<Presence> {
      /// ma zbierac wszystkie obecnosci z osob aktywnych
    // tslint:disable-next-line:max-line-length
    return await this.presenceRepository.query('SELECT `presence`.`id_user`, `presence`.`time` FROM `presence`, `users` WHERE `users`.`id_user` = `presence`.`id_user` AND `users`.`status` = 1 ORDER BY `presence`.`time` DESC');
  }

}
