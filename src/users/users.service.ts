import { Members } from './../members/members.entity';
import { Users } from './users.entity';
import { Injectable, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notes } from 'src/notes/notes.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Members)
    private readonly membersRepository: Repository<Users>,
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Users>,
  ) {}

  async findAllActive(): Promise<Users[]> {
    return await this.usersRepository.find({
      status: true,
    });
  }

  async findAllInactive(): Promise<Users[]> {
    return await this.usersRepository.query('SELECT `id_user` AS `id`, `university`,`department`,`name`,`surname`,`email`,`phone`,`year`,`index` FROM `users` WHERE `users`.`status`= false');
  }

  async findOneAll(id): Promise<Users> {
    return await this.usersRepository.findOneOrFail({id_user: id});
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

  async addToArchive(idArray): Promise<Users> {
    idArray.id = idArray.id.split(',');
    return await Promise.resolve(idArray.id.forEach(element => {
      Promise.all([
        this.membersRepository.delete({
          id_user: element
        }),
        this.notesRepository.delete({
          id_user: element,
        })
      ]).then(() => {
        this.usersRepository.update({
          id_user: element,
        },
        {
          status: false,
        });
      });
    }));
  }

  async unarchiveUsers(idArray): Promise<Users> {
    idArray.id = idArray.id.split(',');
    return await Promise.resolve(idArray.id.forEach(element => {
      this.usersRepository.update({
        id_user: element,
      },
      {
        status: true,
      });
    }));
  }

  async deleteUsers(idArray): Promise<Users> {
    idArray.id = idArray.id.split(',');
    return await Promise.resolve(idArray.id.forEach(element => {
      this.usersRepository.delete({
        id_user: element,
      });
    }));
  }
}
