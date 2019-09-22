import { Authorization } from './../authorization/authorization.entity';
import { Admins } from './../admins/admins.entity';
import { Members } from './../members/members.entity';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { ICheckLogin, ICheckEmail, ICheckPhone, ICheckKey, IUser, ICheckLoginError, ICheckEmailError, ICheckPhoneError, ICheckKeyError } from 'src/typings/typings';
import { Tokens } from 'src/tokens/tokens.entity';
import { Notes } from '../notes/notes.entity';
export declare class UsersService {
    private readonly usersRepository;
    private readonly membersRepository;
    private readonly notesRepository;
    private readonly tokensRepository;
    private readonly adminsRepository;
    private readonly authorizationRepository;
    constructor(usersRepository: Repository<Users>, membersRepository: Repository<Members>, notesRepository: Repository<Notes>, tokensRepository: Repository<Tokens>, adminsRepository: Repository<Admins>, authorizationRepository: Repository<Authorization>);
    findAllActive(): Promise<Users[]>;
    findAllInactive(): Promise<any>;
    findOneAll(id: any): Promise<Users>;
    findOne(id: any): Promise<Users>;
    findUsersWithPresence(): Promise<Users>;
    addToArchive(idArray: any): Promise<Users>;
    unarchiveUsers(idArray: any): Promise<Users>;
    deleteUsers(idArray: any): Promise<Users>;
    deleteUserById(id: any): Promise<any>;
    generatePass(message: any): Promise<void>;
    login(message: any): Promise<string>;
    logout(): Promise<void>;
    addUser(newUser: IUser): Promise<any>;
    isExistPhone(phoneMessage: ICheckPhone): Promise<ICheckPhoneError | null>;
    isExistLogin(loginMessage: ICheckLogin): Promise<ICheckLoginError | null>;
    isExistEmail(emailMessage: ICheckEmail): Promise<ICheckEmailError | null>;
    isExistKey(keyMessage: ICheckKey): Promise<ICheckKeyError | null>;
    putUserData(newUser: Users): Promise<any>;
    putUserPassword(password: any): Promise<any>;
    putUserLogin(login: any): Promise<any>;
    putUserKey(key: any): Promise<any>;
}
