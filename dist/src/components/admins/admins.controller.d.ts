import { AdminsService } from './admins.service';
export declare class AdminsController {
    private admins;
    constructor(admins: AdminsService);
    findAll(): Promise<Array<object>>;
    removeAdmins(message: any): Promise<any>;
    changeDate(message: any): Promise<void>;
    addDate(message: any): Promise<any>;
    generatePass(message: any): Promise<any>;
    checkPass(message: any): Promise<any>;
}
