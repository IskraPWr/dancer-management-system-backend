import { Presence } from './presence.entity';
import { Repository } from 'typeorm';
export declare class PresenceService {
    private readonly presenceRepository;
    constructor(presenceRepository: Repository<Presence>);
    findAll(): Promise<Presence[]>;
    findByIdUser(nr: any): Promise<Presence>;
    findAllFromActiveUsers(): Promise<Presence>;
    findAllFromSemesterById(id: any, semester: any): Promise<Presence[]>;
    findAllPresenceInGroupByIdGroup(id: any): Promise<any>;
}
