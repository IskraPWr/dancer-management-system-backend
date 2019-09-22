import { MembersService } from './members.service';
export declare class MembersController {
    private members;
    constructor(members: MembersService);
    delete(id: any, body: any): Promise<Array<object>>;
    add(id: any, body: any): Promise<Array<object>>;
}
