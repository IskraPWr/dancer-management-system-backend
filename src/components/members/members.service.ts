import { Members } from './members.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class MembersService {
    constructor(
        @InjectRepository(Members)
        private readonly membersRepository: Repository<Members>,
      ) {}

      async removeFromGroup(id, body) {
        return await Promise.resolve(body.forEach(element => {
          this.membersRepository.delete({
            id_group: id,
            id_user: element ,
          });
        }));
      }

      async addToGroup(id, body) {
        return await Promise.resolve(body.forEach(element => {
          this.membersRepository.count({
            id_user: element,
            id_group: id,
          }).then(ans => {
              if(ans === 0){
                const ent = this.membersRepository.create(new Members(element, id));
                this.membersRepository.insert(ent);
              }
          }).catch(error => console.log(error));
        }));
      }
}
