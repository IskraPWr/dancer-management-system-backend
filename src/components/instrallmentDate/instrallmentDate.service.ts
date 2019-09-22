import { Presence } from './../presence/presence.entity';
import { Group } from './../group/group.entity';
import { Installment } from './instrallmentDate.entity';
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class InstallmentDateService {
  constructor(
    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Presence)
    private readonly presenceRepository: Repository<Presence>,
  ) {}

  async findAll(): Promise<Installment[]> {
    return await this.installmentRepository.query(
      'SELECT * FROM `installment` ORDER BY `installment`.`end` DESC',
    );
  }

  async getAllHeaders(): Promise<Installment[]> {
    return await this.installmentRepository.query(
      'SELECT `id_semester`, `name` FROM `installment` ORDER BY `installment`.`end` DESC',
    );
  }

  async getAllSemetersStartAndEnd(): Promise<Installment[]> {
    // tslint:disable-next-line:max-line-length
    return await this.installmentRepository.query(
      'SELECT `id_semester`, `start`, `end`, `name` FROM `installment` ORDER BY `installment`.`end` DESC',
    );
  }

  async findSemesterByIdGroup(id): Promise<Installment[]> {
    return await this.installmentRepository.query(
      'SELECT `installment`.`start`, `installment`.`end` FROM `installment`, `group` WHERE `installment`.`id_semester`=`group`.`id_semester` AND `group`.`id`=' +
        id,
    );
  }

  async changeDate(message) {
    return await this.installmentRepository.update(
      {
        id_semester: message.id,
      },
      {
        [message.field]:
          message.field === 'name'
            ? message.value
            : new Date(new Date(message.value).setHours(23, 59, 59, 999)),
      },
    );
  }

  async addDate(message) {
    return await Promise.resolve()
      .then(() => {
        const ent = this.installmentRepository.create(
          new Installment(
            message.name,
            message.start,
            message.date_1,
            message.date_2,
            message.date_3,
            message.end,
          ),
        );
        this.installmentRepository.insert(ent);
      })
      .catch(er => {
        console.log(er);
      });
  }

  async removeDate(idArray) {
    return await Promise.resolve(
      idArray.ids.forEach(element => {
        Promise.resolve(this.groupRepository.find({
          id_semester: element
        })).then(groups => {
          groups.forEach(group => {
            this.presenceRepository.delete({
              id_group: group.id
            })
          })
        }).then(()=>{
          this.installmentRepository.delete({
            id_semester: element,
          });
          this.groupRepository.delete({
            id_semester: element,
          });
        })
      }),
    );
  }
}
