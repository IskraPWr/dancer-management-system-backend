import { Mail } from '../../mailer/mail-data';
import { Admins } from './admins.entity';
import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import * as generator from 'generate-password';
import * as hash from 'password-hash';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admins)
    private readonly adminsRepository: Repository<Admins>,
  ) {}

  async findAll(): Promise<Admins[]> {
    return await this.adminsRepository.find();
  }

  async removeAdmins(idArray): Promise<Admins> {
    return await Promise.resolve(
      idArray.ids.forEach(element => {
        this.adminsRepository.delete({
          id: element,
        });
      }),
    );
  }

  async changeDate(message) {
    return await Promise.resolve(
      this.adminsRepository.find({
        id: message.id,
      }),
    ).then(admin => {
      if (admin[0]) {
        if (hash.verify(message.password, admin[0].password)) {
          this.adminsRepository.update(
            {
              id: message.id,
            },
            {
              [message.field]: message.value,
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
      new Mail().sendMail('newSiteAdmin', message.email, {password: pass} );
      const ent = this.adminsRepository.create(
        new Admins(
          message.name,
          message.surname,
          message.email,
          message.login,
          hash.generate(pass),
        ),
      );
      this.adminsRepository.insert(ent);
    });
  }

  async generatePass(password) {
    const pass = generator.generate({
      length: 10,
      numbers: true,
    });
    return await Promise.resolve()
      .then(() => {
        return this.adminsRepository.findOne({
          id: password.id,
        });
      })
      .then(admin => {
        new Mail().sendMail('newPassSite', admin.email, {password: pass} );
        this.adminsRepository.update(
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
    return await this.adminsRepository.findOne({
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
