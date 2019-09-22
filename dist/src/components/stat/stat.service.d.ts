import { Presence } from './../presence/presence.entity';
import { Group } from './../group/group.entity';
import { Installment } from './../instrallmentDate/instrallmentDate.entity';
import { Repository } from 'typeorm';
import { IPresenceStat } from './../../typings/typings';
import { Users } from '../users/users.entity';
export declare class StatService {
    private readonly usersRepository;
    private readonly semestersRepository;
    private readonly groupsRepository;
    private readonly presencesRepository;
    constructor(usersRepository: Repository<Users>, semestersRepository: Repository<Installment>, groupsRepository: Repository<Group>, presencesRepository: Repository<Presence>);
    getAllPresenceStat(): Promise<any>;
    getPresenceStat(id: number): Promise<IPresenceStat | any[]>;
}
