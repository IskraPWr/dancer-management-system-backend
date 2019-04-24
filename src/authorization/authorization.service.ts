import { Mail } from './../admins/mail-data';
import { Authorization } from './authorization.entity';
import { Injectable, Inject, HttpStatus, HttpCode, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import * as generator from 'generate-password';
import * as hash from 'password-hash';

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectRepository(Authorization)
    private readonly authorizationRepository: Repository<Authorization>,
  ) {}

  async findAll(): Promise<Authorization[]> {
    return await this.authorizationRepository.find();
  }

  async removeAdmins(idArray): Promise<Authorization[]> {
    idArray.id = idArray.id.split(',');
    return await Promise.resolve(
      idArray.id.forEach(element => {
        this.authorizationRepository.delete({
          id: element,
        });
      }),
    );
  }

  async changeDate(message) {
    return await Promise.resolve(
      this.authorizationRepository.find({
        id: message.id,
      }),
    ).then(admin => {
      if (admin[0]) {
        if (hash.verify(message.password, admin[0].password)) {
          this.authorizationRepository.update(
            {
              id: message.id,
            },
            {
              [message.name]: message.value,
            },
          );
        } else {
           throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
        }
      }
    });
  }

  async addDate(message) {
    return await Promise.resolve().then(() => {
      const pass = generator.generate({
        length: 10,
        numbers: true,
      });
      new Mail(pass, message.mail, 2);
      const ent = this.authorizationRepository.create(
        new Authorization(
          message.name,
          message.surname,
          message.mail,
          message.login,
          hash.generate(pass),
        ),
      );
      this.authorizationRepository.insert(ent);
    });
  }

  async generatePass(message) {
    const pass = generator.generate({
      length: 10,
      numbers: true,
    });
    return await Promise.resolve()
      .then(() => {
        return this.authorizationRepository.find({
          id: message.id,
        });
      })
      .then(user => {
        new Mail(pass, user[0].mail, 3);
        this.authorizationRepository.update(
          {
            id: message.id,
          },
          {
            password: hash.generate(pass),
          },
        );
      });
  }
}
