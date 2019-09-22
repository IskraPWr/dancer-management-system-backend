import { Members } from './members.entity';
import { Repository } from 'typeorm';
export declare class MembersService {
    private readonly membersRepository;
    constructor(membersRepository: Repository<Members>);
    removeFromGroup(id: any, body: any): Promise<any>;
    addToGroup(id: any, body: any): Promise<any>;
}
