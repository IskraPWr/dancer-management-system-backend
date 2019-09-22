import { Presence } from './../presence/presence.entity';
import { Group } from './group.entity';
import { Repository } from 'typeorm';
export declare class GroupService {
    private readonly groupRepository;
    private readonly presenceRepository;
    constructor(groupRepository: Repository<Group>, presenceRepository: Repository<Presence>);
    findAll(): Promise<Group[]>;
    findAllOrderById(): Promise<Group[]>;
    findAllBySemesterId(id: any): Promise<Group[]>;
    findAllHeadersBySemesterId(id: any): Promise<Group[]>;
    findAllUsersByIdGroup(id: any): Promise<Group[]>;
    findAllAssignment(): Promise<Group[]>;
    findGroupById(id: any): Promise<Group[]>;
    removeDate(idArray: any): Promise<any>;
    changeDate(message: any): Promise<import("typeorm/query-builder/result/UpdateResult").UpdateResult>;
    addDate(message: any): Promise<void>;
}
