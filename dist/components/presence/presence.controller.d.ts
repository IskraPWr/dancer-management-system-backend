import { PresenceService } from './presence.service';
import { UsersService } from './../users/users.service';
import { NotesService } from './../notes/notes.service';
import { GroupService } from '../group/group.service';
export declare class PresenceController {
    private users;
    private notes;
    private presence;
    private group;
    constructor(users: UsersService, notes: NotesService, presence: PresenceService, group: GroupService);
    find(id: any): Promise<Array<object>>;
    findAll(): Promise<any[]>;
}
