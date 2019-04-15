import { Presence } from './../presence/presence.entity';
import { Group } from './group.entity';
import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Presence)
    private readonly presenceRepository: Repository<Presence>,
  ) {}

  async findAll(): Promise<Group[]> {
    return await this.groupRepository.query('SELECT * FROM `group` ORDER BY `group`.`id_semester` DESC');
  }

  async findAllOrderById(): Promise<Group[]> {
    return await this.groupRepository.query('SELECT * FROM `group` ORDER BY `group`.`id` ASC');
  }


  async findAllBySemesterId(id): Promise<Group[]> {
    return await this.groupRepository.query('SELECT * FROM `group` WHERE `group`.`id_semester` =' + id);
  }

  async findAllHeadersBySemesterId(id): Promise<Group[]> {
    return await this.groupRepository.query('SELECT `id`, `name` FROM `group` WHERE `group`.`id_semester` =' + id);
  }

  async findAllUsersByIdGroup(id): Promise<Group[]> {
    return await this.groupRepository.query('SELECT DISTINCT `users`.`id_user`, `users`.`name` , `users`.`gender`,  `users`.`surname` FROM `members`, `users`, `group` WHERE  `users`.`id_user` = `members`.`id_user` AND `users`.`status` = 1 AND `members`.`id_group` =' + id + ' ORDER BY `users`.`id_user` ASC');
  }

  async findAllAssignment(): Promise<Group[]> {
    return await this.groupRepository.query('SELECT DISTINCT `members`.`id`, `group`.`name` AS `group_name`, `installment`.`name` AS `semester_name`, `members`.`id_user` FROM `members`, `group`, `installment` WHERE `members`.`id_group` = `group`.`id` AND `installment`.`id_semester`= `group`.`id_semester` ORDER BY `members`.`id_user` ASC');
  }

  async findGroupById(id): Promise<Group[]> {
    return await this.groupRepository.query('SELECT `group`.`day` FROM `group` WHERE `group`.`id`=' + id);
  }

  
  async removeDate(idArray) {
    idArray.id = idArray.id.split(',');
    return await Promise.resolve(
      idArray.id.forEach(element => {
        Promise.all([
          this.presenceRepository.delete({
            id_group: element
          }),
          this.groupRepository.delete({
            id_semester: element,
          })
        ])
      }),
    );
  }

  async changeDate(message) {
    return await this.groupRepository.update(
      {
        id: message.id,
      },
      {
        [message.name]: message.value
      },
    );
  }

  async addDate(message) {
    return await Promise.resolve()
      .then(() => {
        const ent = this.groupRepository.create(
          new Group(
            message.id_semester,
            message.name,
            message.day,
            message.start,
            message.end,
          ),
        );
        this.groupRepository.insert(ent);
      })
      .catch(er => {
        console.log(er);
      });
  }
}
