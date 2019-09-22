import { NotesService } from './../notes/notes.service';
import { InstallmentDateService } from './../instrallmentDate/instrallmentDate.service';
import { GroupService } from './../group/group.service';
import { UsersService } from '../users/users.service';
export declare class AssignmentspController {
    private group;
    private semesters;
    private users;
    private notes;
    constructor(group: GroupService, semesters: InstallmentDateService, users: UsersService, notes: NotesService);
    findAllWithAssignments(): Promise<any[]>;
}
