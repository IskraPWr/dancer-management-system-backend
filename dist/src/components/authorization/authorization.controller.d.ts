import { AuthorizationService } from './authorization.service';
export declare class AuthorizationController {
    private authorization;
    constructor(authorization: AuthorizationService);
    findAll(): Promise<import("./authorization.entity").Authorization[]>;
    removeAdmins(message: any): Promise<any>;
    changeDate(message: any): Promise<void>;
    addDate(message: any): Promise<void>;
    generatePass(message: any): Promise<void>;
    checkPass(message: any): Promise<boolean>;
}
