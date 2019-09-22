import { NotesService } from './../notes/notes.service';
import { InstallmentDateService } from './../instrallmentDate/instrallmentDate.service';
import { GroupService } from './group.service';
import { PresenceService } from '../presence/presence.service';
export declare class GroupController {
    private group;
    private semesters;
    private notes;
    private presence;
    constructor(group: GroupService, semesters: InstallmentDateService, notes: NotesService, presence: PresenceService);
    findAll(): Promise<Array<object>>;
    findOne(id: any): Promise<Array<object>>;
    findUsers(id: any): Promise<Array<object>>;
    removeDate(message: any): Promise<any>;
    changeDate(message: any): Promise<object>;
    addDate(message: any): Promise<any>;
}
