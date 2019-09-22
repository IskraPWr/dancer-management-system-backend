import { Mail } from './../../mailer/mail-data';
import { Authorization } from './../authorization/authorization.entity';
import { Admins } from './../admins/admins.entity';
import { Members } from './../members/members.entity';
import { Users } from './users.entity';
import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import * as hash from 'password-hash';
import * as generator from 'generate-password';
import {
  ICheckLogin,
  ICheckEmail,
  ICheckPhone,
  ICheckKey,
  IUser,
  ICheckLoginError,
  ICheckEmailError,
  ICheckPhoneError,
  ICheckKeyError,
} from 'src/typings/typings';

import { Notes } from '../notes/notes.entity';
import { error } from 'util';
import { Tokens } from '../../tokens/tokens.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Members)
    private readonly membersRepository: Repository<Members>,
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
    @InjectRepository(Tokens)
    private readonly tokensRepository: Repository<Tokens>,
    @InjectRepository(Admins)
    private readonly adminsRepository: Repository<Admins>,
    @InjectRepository(Authorization)
    private readonly authorizationRepository: Repository<Authorization>,
  ) {}

  async findAllActive(): Promise<Users[]> {
    return await this.usersRepository.find({
      status: true,
    });
  }

  async findAllInactive(): Promise<any> {
    return await this.usersRepository
      .find({
        status: false,
      })
      .then((data: any[]) => {
        return data.map(user => {
          const {
            name,
            surname,
            gender,
            phone,
            university,
            id_user,
            index,
            department,
            year,
            email,
          } = user;
          return {
            name,
            surname,
            gender,
            phone,
            university,
            id: id_user,
            index,
            department,
            year,
            email,
          };
        });
      });
  }

  async findOneAll(id): Promise<Users> {
    return await this.usersRepository.findOneOrFail({ id_user: id });
  }

  async findOne(id): Promise<Users> {
    return await this.usersRepository
      .findOne({
        id_user: id,
      })
      .then((user: Users) => {
        delete user.password;
        delete user.login;
        delete user.id_user;
        return user;
      });
  }

  async findUsersWithPresence(): Promise<Users> {
    return await this.usersRepository.query(
      // tslint:disable-next-line:max-line-length
      'SELECT DISTINCT `users`.`id_user`,`users`.`name`, `users`.`surname` FROM `users`, `presence` WHERE `users`.`id_user` = `presence`.`id_user` AND `users`.`status` = 1 ORDER BY `users`.`id_user` ASC',
    );
  }

  async addToArchive(idArray): Promise<Users> {
    return await Promise.resolve(
      idArray.ids.forEach(element => {
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
    return await Promise.resolve(
      idArray.ids.forEach(element => {
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
    return await Promise.resolve(
      idArray.ids.forEach(element => {
        this.usersRepository.delete({
          id_user: element,
        });
      }),
    );
  }

  async deleteUserById(id): Promise<any> {
    return this.usersRepository.delete({
      id_user: id,
    }).then((result: DeleteResult) => {
      if (result.affected === 0){
        throw new HttpException('notFound', HttpStatus.BAD_REQUEST);
      }
    }).catch(error => {
      throw new HttpException('notFound', HttpStatus.BAD_REQUEST);
    });
  }

  async generatePass(message) {
    return await Promise.all([
      this.usersRepository.findOne({
        login: message.login,
        email: message.email,
      }),
      this.adminsRepository.findOne({
        login: message.login,
        email: message.email,
      }),
    ]).then(([user, admin]) => {
      const pass = generator.generate({
        length: 10,
        numbers: true,
      });

      if (user) {
        this.usersRepository.update(
          {
            login: message.login,
            email: message.email,
          },
          {
            password: hash.generate(pass),
          },
        );
        new Mail().sendMail('newPassUser', user.email, { password: pass });
      } else if (admin) {
        this.adminsRepository.update(
          {
            login: message.login,
            email: message.email,
          },
          {
            password: hash.generate(pass),
          },
        );
        new Mail().sendMail('newPassSite', admin.email, { password: pass });
      } else {
        throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
      }
    });
  }

  async login(message) {
    return await Promise.all([
      this.usersRepository.findOne({
        login: message.login,
      }),
      this.usersRepository.findOne({
        email: message.login,
      }),
      this.authorizationRepository.findOne({
        login: message.login,
      }),
      this.authorizationRepository.findOne({
        email: message.login,
      }),
      this.adminsRepository.findOne({
        login: message.login,
      }),
      this.adminsRepository.findOne({
        email: message.login,
      }),
    ]).then(
      ([user, userByEmail, appAdmin, appAdminByEmail, admin, adminByEmail]) => {
        const token = generator.generate({
          length: 50,
          numbers: true,
          excludeSimilarCharacters: true,
        });
        if (user || userByEmail) {
          if (
            user
              ? hash.verify(message.password, user.password)
              : hash.verify(message.password, userByEmail.password)
          ) {
            const el: Tokens = this.tokensRepository.create(
              new Tokens(token, 0, user ? user.id_user : userByEmail.id_user),
            );
            this.tokensRepository.insert(el);
            return JSON.stringify({
              token: token,
              role: 'user',
              id: user.id_user,
            });
          } else {
            throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
          }
        } else if (appAdmin || appAdminByEmail) {
          if (
            appAdmin
              ? hash.verify(message.password, appAdmin.password)
              : hash.verify(message.password, appAdminByEmail.password)
          ) {
            const el: Tokens = this.tokensRepository.create(
              new Tokens(token, 1, appAdmin ? appAdmin.id : appAdminByEmail.id),
            );
            this.tokensRepository.insert(el);
            return JSON.stringify({
              token: token,
              role: 'appAdmin',
              id: appAdmin.id,
            });
          } else {
            throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
          }
        } else if (admin || adminByEmail) {
          if (
            hash.verify(message.password, admin.password) ||
            hash.verify(message.password, adminByEmail.password)
          ) {
            const el: Tokens = this.tokensRepository.create(
              new Tokens(token, 2, admin.id ? admin.id : adminByEmail.id),
            );
            this.tokensRepository.insert(el);
            return JSON.stringify({
              token: token,
              role: 'admin',
              id: admin.id,
            });
          } else {
            throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
          }
        } else {
          throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
        }
      },
    );
  }

  async logout() {}

  /////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  async addUser(newUser: IUser): Promise<any> {
    return await Promise.resolve()
      .then(() => {
        const ent = this.usersRepository.create(
          new Users(
            hash.generate(newUser.password),
            newUser.name,
            newUser.surname,
            newUser.login,
            newUser.gender,
            newUser.email,
            newUser.phone,
            newUser.university,
            newUser.year,
            newUser.index,
            newUser.key1,
            newUser.key2,
            newUser.department
          ),
        );
        return this.usersRepository.insert(ent);
      })
      .then(() => {
        return new Mail().sendMail('newUser', newUser.email);
      })
      .catch((err: any) => {
        throw new HttpException('Internal Server Error', 500);
      });
  }

  // validators

  async isExistPhone(
    phoneMessage: ICheckPhone,
  ): Promise<ICheckPhoneError | null> {
    return await this.usersRepository
      .findOne({
        phone: phoneMessage.phone,
      })
      .then((user: Users) => {
        if (!user) {
          return null;
        }

        if (phoneMessage.id) {
          if (user.id_user === phoneMessage.id) {
            return null;
          }
        }

        return { phoneExist: true };
      });
  }

  async isExistLogin(
    loginMessage: ICheckLogin,
  ): Promise<ICheckLoginError | null> {
    return await this.usersRepository
      .findOne({
        login: loginMessage.login,
      })
      .then((user: Users) => {
        if (!user) {
          return null;
        }

        if (loginMessage.id) {
          if (user.id_user === loginMessage.id) {
            return null;
          }
        }

        return { loginExist: true };
      });
  }

  async isExistEmail(
    emailMessage: ICheckEmail,
  ): Promise<ICheckEmailError | null> {
    return await this.usersRepository
      .findOne({
        email: emailMessage.email,
      })
      .then((user: Users) => {
        if (!user) {
          return null;
        }

        if (emailMessage.id) {
          if (user.id_user === emailMessage.id) {
            return null;
          }
        }

        return { emailExist: true };
      });
  }

  async isExistKey(keyMessage: ICheckKey): Promise<ICheckKeyError | null> {
    return await Promise.all([
      this.usersRepository.findOne({
        key1: keyMessage.key,
      }),
      this.usersRepository.findOne({
        key2: keyMessage.key,
      }),
    ]).then(users => {
      if (!users[0] && !users[1]) {
        return null;
      }

      if (users[0]) {
        if (
          users[0].key1 === '' ||
          users[0].key1 === undefined ||
          users[0].key1 === null
        ) {
          return null;
        } else if (keyMessage.id) {
          if (users[0].id_user === keyMessage.id) {
            return null;
          }
        }
      }

      if (users[1]) {
        if (
          users[1].key2 === '' ||
          users[1].key2 === undefined ||
          users[1].key2 === null
        ) {
          return null;
        } else if (keyMessage.id) {
          if (users[1].id_user === keyMessage.id) {
            return null;
          }
        }
      }

      return { keyExist: true };
    });
  }

  // put

  putUserData(newUser: Users): Promise<any> {
    return this.usersRepository
      .update(
        {
          id_user: newUser.id_user,
        },
        {
          department: newUser.department,
          email: newUser.email,
          index: newUser.index,
          name: newUser.name,
          phone: newUser.phone,
          surname: newUser.surname,
          university: newUser.university,
          year: newUser.year,
        },
      )
      .catch(error => {
        throw new HttpException('notFound', HttpStatus.BAD_REQUEST);
      });
  }

  putUserPassword(password): Promise<any> {
    return this.usersRepository.findOne({
      id_user: password.id_user
    }).then(user => {
      if (!user){
        throw new HttpException('notFound', HttpStatus.BAD_REQUEST);
      }
      if (hash.verify(password.opass, user.password)){
        return this.usersRepository.update(
          {
            id_user: password.id_user,
          },
          {
            password: hash.generate(password.pass),
          },
        );
      } else {
        throw new HttpException('notFound', HttpStatus.BAD_REQUEST);
      }
    }).then((result: UpdateResult) => {
      if (result.raw['changedRows'] === 0){
        throw new HttpException('notFound', HttpStatus.BAD_REQUEST);
      }
    }).catch(error => {
      throw new HttpException('notFound', HttpStatus.BAD_REQUEST);
    });
  }

  putUserLogin(login): Promise<any> {
    return this.usersRepository
      .update(
        {
          id_user: login.id_user,
          login: login.ologin
        },
        {
          login: login.login,
        },
      ).then((result: UpdateResult) => {
        if (result.raw['changedRows'] === 0){
          throw new HttpException('notFound', HttpStatus.BAD_REQUEST);
        }
      })
      .catch(error => {
        throw new HttpException('notFound', HttpStatus.BAD_REQUEST);
      });
  }

  putUserKey(key): Promise<any> {
    return this.usersRepository
      .update(
        {
          id_user: key.id_user,
        },
        {
          key1: key.key1,
          key2: key.key2,
        },
      )
      .catch(error => {
        throw new HttpException('notFound', HttpStatus.BAD_REQUEST);
      });
  }
}
