import { Admins } from './admins.entity';
import { Repository } from 'typeorm';
export declare class AdminsService {
    private readonly adminsRepository;
    constructor(adminsRepository: Repository<Admins>);
    findAll(): Promise<Admins[]>;
    removeAdmins(idArray: any): Promise<Admins>;
    changeDate(message: any): Promise<void>;
    addDate(message: any): Promise<void>;
    generatePass(password: any): Promise<void>;
    checkPass(message: any): Promise<boolean>;
}
