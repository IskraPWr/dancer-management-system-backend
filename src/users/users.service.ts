import { Users } from './users.entity';
import { Injectable, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findAllActive(): Promise<Users[]> {
    return await this.usersRepository.find({
      status: true,
    });
  }

  async findAllInactive(): Promise<Users[]> {
    return await this.usersRepository.find({
      status: false,
    });
  }

  async findOne(id): Promise<Users> {
      return await this.usersRepository.query(
      // tslint:disable-next-line:max-line-length
      'SELECT `id_user`,`university`,`status`,`department`,`name`,`surname`,`email`,`phone`,`year`,`index`, `key1`, `key2` FROM `users` WHERE `id_user`=' + id);
  }

  async findUsersWithPresence(): Promise<Users> {
    return await this.usersRepository.query(
    // tslint:disable-next-line:max-line-length
    'SELECT DISTINCT `users`.`id_user`,`users`.`name`, `users`.`surname` FROM `users`, `presence` WHERE `users`.`id_user` = `presence`.`id_user` AND `users`.`status` = 1 ORDER BY `users`.`id_user` ASC');
}

}
