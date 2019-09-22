import { UsersService } from './../users/users.service';
export declare class ArchivesController {
    private db;
    constructor(db: UsersService);
    findAll(): Promise<object>;
    add(idArray: any): Promise<object>;
    revert(idArray: any): Promise<object>;
}
