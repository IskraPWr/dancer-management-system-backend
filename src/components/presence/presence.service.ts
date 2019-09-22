import { Presence } from './presence.entity';
import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PresenceService {
  constructor(
    @InjectRepository(Presence)
    private readonly presenceRepository: Repository<Presence>,
  ) {}

  async findAll(): Promise<Presence[]> {
    return await this.presenceRepository.query('SELECT * FROM `presence` ORDER BY `presence`.`id_user` DESC');
  }

  async findByIdUser(nr): Promise<Presence> {
      return await this.presenceRepository.query('SELECT * FROM `presence` WHERE `id_user` = ' + nr + ' ORDER BY `presence`.`time` DESC');
  }

  async findAllFromActiveUsers(): Promise<Presence> {
      /// ma zbierac wszystkie obecnosci z osob aktywnych
    // tslint:disable-next-line:max-line-length
    return await this.presenceRepository.query('SELECT `presence`.`id_user`, `presence`.`time`, `presence`.`id_group` FROM `presence`, `users` WHERE `users`.`id_user` = `presence`.`id_user` AND `users`.`status` = 1 ORDER BY `presence`.`time` DESC');
  }

  async findAllFromSemesterById(id, semester): Promise<Presence[]> {
    /// ma zbierac wszystkie obecnosci z osob aktywnych
  // tslint:disable-next-line:max-line-length
  return await this.presenceRepository.query('SELECT `presence`.`time`, `presence`.`id_group` FROM `presence`, `users`, `installment` WHERE `presence`.`id_user` = `users`.`id_user` AND `presence`.`time` >= `installment`.`start` AND `presence`.`time` <= `installment`.`end` AND `users`.`id_user` = ' + id + ' AND `installment`.`id_semester` = ' + semester + ' ORDER BY `presence`.`time` DESC');
}

  async findAllPresenceInGroupByIdGroup(id){
    return await this.presenceRepository.query("SELECT DISTINCT `presence`.`id_user`, `presence`.`time` FROM `users`, `presence` WHERE `users`.`status` = 1 AND `presence`.`id_group`= " + id + " ORDER BY `presence`.`id_user` ASC");
  }

}
