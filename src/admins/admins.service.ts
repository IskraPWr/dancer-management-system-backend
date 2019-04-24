import { Mail } from './mail-data';
import { Admins } from './admins.entity';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
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
    idArray.id = idArray.id.split(',');
    return await Promise.resolve(
      idArray.id.forEach(element => {
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
      new Mail(pass, message.mail, 0);
      const ent = this.adminsRepository.create(
        new Admins(
          message.name,
          message.surname,
          message.mail,
          message.login,
          hash.generate(pass),
        ),
      );
      this.adminsRepository.insert(ent);
    });
  }

  async generatePass(message) {
    const pass = generator.generate({
      length: 10,
      numbers: true,
    });
    return await Promise.resolve()
      .then(() => {
        return this.adminsRepository.find({
          id: message.id,
        });
      })
      .then(user => {
        new Mail(pass, user[0].mail, 1);
        this.adminsRepository.update(
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
