import { Authorization } from './authorization.entity';
import { Repository } from 'typeorm';
export declare class AuthorizationService {
    private readonly authorizationRepository;
    constructor(authorizationRepository: Repository<Authorization>);
    findAll(): Promise<Authorization[]>;
    removeAdmins(idArray: any): Promise<any>;
    changeDate(message: any): Promise<void>;
    addDate(message: any): Promise<void>;
    generatePass(password: any): Promise<void>;
    checkPass(message: any): Promise<boolean>;
}
