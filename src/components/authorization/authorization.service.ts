import { Mail } from '../../mailer/mail-data';
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

  async removeAdmins(idArray){
    return await Promise.resolve(
      idArray.ids.forEach(element => {
        this.authorizationRepository.delete({
          id: element,
        });
      }),
    );
  }

  async changeDate(message) {
    return await Promise.resolve(
      this.authorizationRepository.findOne({
        id: message.id,
      }),
    ).then(admin => {
      if (admin) {
          this.authorizationRepository.update(
            {
              id: message.id,
            },
            {
              [message.field]: message.value,
            },
          );
      }
    });
  }

  async addDate(message) {
    return await Promise.resolve().then(() => {
      const pass = generator.generate({
        length: 10,
        numbers: true,
      });
      new Mail().sendMail('newApplicationAdmin', message.email, {password: pass} );
      const ent = this.authorizationRepository.create(
        new Authorization(
          message.name,
          message.surname,
          message.email,
          message.login,
          hash.generate(pass),
        ),
      );
      this.authorizationRepository.insert(ent);
    });
  }

  async generatePass(password) {
    const pass = generator.generate({
      length: 10,
      numbers: true,
    });
    return await Promise.resolve()
      .then(() => {
        return this.authorizationRepository.findOne({
          id: password.id,
        });
      })
      .then(admin => {
        new Mail().sendMail('newPassApplication', admin.email, {password: pass} );
        this.authorizationRepository.update(
          {
            id: password.id,
          },
          {
            password: hash.generate(pass),
          },
        );
      });
  }

  async checkPass(message) {
    return await this.authorizationRepository.findOne({
      id: message.id,
    }).then(admin => {
      if (!admin) {
        return false;
      }
      if (hash.verify(message.password, admin.password)) {
        return true;
      }
      return false;
    }).catch(error => {
      throw new HttpException ('Error', 404);
    })
  }
}
