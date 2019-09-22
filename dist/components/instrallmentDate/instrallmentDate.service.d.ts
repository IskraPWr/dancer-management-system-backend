import { Presence } from './../presence/presence.entity';
import { Group } from './../group/group.entity';
import { Installment } from './instrallmentDate.entity';
import { Repository } from 'typeorm';
export declare class InstallmentDateService {
    private readonly installmentRepository;
    private readonly groupRepository;
    private readonly presenceRepository;
    constructor(installmentRepository: Repository<Installment>, groupRepository: Repository<Group>, presenceRepository: Repository<Presence>);
    findAll(): Promise<Installment[]>;
    getAllHeaders(): Promise<Installment[]>;
    getAllSemetersStartAndEnd(): Promise<Installment[]>;
    findSemesterByIdGroup(id: any): Promise<Installment[]>;
    changeDate(message: any): Promise<import("typeorm/query-builder/result/UpdateResult").UpdateResult>;
    addDate(message: any): Promise<void>;
    removeDate(idArray: any): Promise<any>;
}
