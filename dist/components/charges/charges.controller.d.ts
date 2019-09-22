import { InstallmentDateService } from './../instrallmentDate/instrallmentDate.service';
import { ListService } from './../list/list.service';
import { NotesService } from './../notes/notes.service';
import { UsersService } from './../users/users.service';
export declare class ChargesController {
    private users;
    private notes;
    private list;
    private semester;
    constructor(users: UsersService, notes: NotesService, list: ListService, semester: InstallmentDateService);
    findAll(): Promise<any[]>;
    find(id: any): Promise<{
        semester: import("../instrallmentDate/instrallmentDate.entity").Installment;
        charges: {
            entryFee: number;
            charges_1: number;
            charges_2: number;
            charges_3: number;
            declaration: any;
        };
        dues: string[];
    }>;
}
