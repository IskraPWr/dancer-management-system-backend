import { InstallmentDateService } from './../instrallmentDate/instrallmentDate.service';
import { GroupService } from './../group/group.service';
import { PresenceService } from './../presence/presence.service';
import { UsersService } from '../users/users.service';
import { StatService } from './stat.service';
export declare class StatisticsUniversityController {
    private user;
    private users;
    private presence;
    private semesters;
    private groups;
    private stat;
    constructor(user: UsersService, users: UsersService, presence: PresenceService, semesters: InstallmentDateService, groups: GroupService, stat: StatService);
    findUniversities(): Promise<Array<object>>;
    findPresenceAll(id: any): Promise<Array<object>>;
    findAllGender(): Promise<Array<object>>;
    findGender(): Promise<Array<object>>;
    findCharges(): Promise<Array<object>>;
    findGenderInArchives(): Promise<Array<object>>;
    find(id: any, id_semester: any): Promise<any[]>;
    getPresence(): Promise<any>;
    findPresence(id: any): Promise<any[] | import("../../typings/typings").IPresenceStat>;
}
