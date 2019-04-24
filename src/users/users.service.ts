import { Members } from './../members/members.entity';
import { Users } from './users.entity';
import { Injectable, Inject, HttpCode, HttpStatus, HttpException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,  } from 'typeorm';
import { Notes } from 'src/notes/notes.entity';
import * as hash from 'password-hash';
import { Mail } from 'src/admins/mail-data';
import * as generator from 'generate-password';


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
    return await this.usersRepository.query(
      'SELECT `id_user` AS `id`, `university`,`department`,`name`,`surname`,`email`,`phone`,`year`,`index` FROM `users` WHERE `users`.`status`= false',
    );
  }

  async findOneAll(id): Promise<Users> {
    return await this.usersRepository.findOneOrFail({ id_user: id });
  }

  async findOne(id): Promise<Users> {
    return await this.usersRepository.query(
      // tslint:disable-next-line:max-line-length
      'SELECT `id_user`,`university`,`status`,`department`,`name`,`surname`,`email`,`phone`,`year`,`index`, `key1`, `key2` FROM `users` WHERE `id_user`=' +
        id,
    );
  }

  async findUsersWithPresence(): Promise<Users> {
    return await this.usersRepository.query(
      // tslint:disable-next-line:max-line-length
      'SELECT DISTINCT `users`.`id_user`,`users`.`name`, `users`.`surname` FROM `users`, `presence` WHERE `users`.`id_user` = `presence`.`id_user` AND `users`.`status` = 1 ORDER BY `users`.`id_user` ASC',
    );
  }

  async addToArchive(idArray): Promise<Users> {
    idArray.id = idArray.id.split(',');
    return await Promise.resolve(
      idArray.id.forEach(element => {
        Promise.all([
          this.membersRepository.delete({
            id_user: element,
          }),
          this.notesRepository.delete({
            id_user: element,
          }),
        ]).then(() => {
          this.usersRepository.update(
            {
              id_user: element,
            },
            {
              status: false,
            },
          );
        });
      }),
    );
  }

  async unarchiveUsers(idArray): Promise<Users> {
    idArray.id = idArray.id.split(',');
    return await Promise.resolve(
      idArray.id.forEach(element => {
        this.usersRepository.update(
          {
            id_user: element,
          },
          {
            status: true,
          },
        );
      }),
    );
  }

  async deleteUsers(idArray): Promise<Users> {
    idArray.id = idArray.id.split(',');
    return await Promise.resolve(
      idArray.id.forEach(element => {
        this.usersRepository.delete({
          id_user: element,
        });
      }),
    );
  }

  async isExistLogin(message) {
    return (await this.usersRepository.count({
      login: message.login,
    }))
      ? { loginExist: true }
      : null;
  }

  async isExistEmail(message) {
    return (await this.usersRepository.count({
      email: message.email,
    }))
      ? { emailExist: true }
      : null;
  }

  async isExistPhone(message) {
    return (await this.usersRepository.count({
      phone: message.phone,
    }))
      ? { phoneExist: true }
      : null;
  }

  async isExistKey(message) {
    return await Promise.all([
      this.usersRepository.count({
        key1: message.key,
      }),
      this.usersRepository.count({
        key2: message.key,
      }),
    ]).then(value => {
      if (value[0] === 0 && value[1] === 0) {
        return null;
      } else {
        return { keyExist: true };
      }
    });
  }

  async addUser(message) {
    return await Promise.resolve().then(() => {
      const ent = this.usersRepository.create(
        new Users(
          hash.generate(message.password),
          message.name,
          message.surname,
          message.login,
          message.gender,
          message.email,
          message.phone,
          message.university,
          message.year,
          message.index,
          message.key1,
          message.key2,
        ),
      );
      this.usersRepository.insert(ent);
      new Mail('Zespół SKTT Iskra PWr', message.email, 4);
    });
  }

  async generatePass(message) {
    return await Promise.resolve(
      this.usersRepository.count({
        login: message.login,
        email: message.email,
      }),
    ).then(ans => {
      if (ans === 1) {
        const pass = generator.generate({
          length: 10,
          numbers: true,
        });
        this.usersRepository.update(
          {
            login: message.login,
            email: message.email,
          },
          {
            password: hash.generate(pass),
          },
        );
        new Mail(pass, message.email, 5);
      } else {
         throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
      }
    });
  }

  async login(message) {
    return await Promise.resolve(
      this.usersRepository.findOne({
        login: message.login,
      }),
    ).then(data => {
      if (data) {
        if (hash.verify(message.password, data.password)) {
          // jakos musze Cie zalogować
        } else {
          throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
        }
      }else {
        throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
      }
    });
  }
}
