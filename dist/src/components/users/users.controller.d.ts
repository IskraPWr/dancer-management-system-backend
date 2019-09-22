import { GeneratePass, NewAccountData } from './../../validators/validators';
import { NotesService } from './../notes/notes.service';
import { UsersService } from './users.service';
import { ICheckLoginError, ICheckPhoneError, ICheckKeyError, ICheckEmailError } from './../../typings/typings';
import { Users } from './users.entity';
export declare class UsersController {
    private users;
    private notes;
    constructor(users: UsersService, notes: NotesService);
    deleteUsers(idArray: any): Promise<object>;
    deleteUserById(id: any): Promise<object>;
    generatePass(message: GeneratePass): Promise<void>;
    findOne(id: any): Promise<Users>;
    findAll(): Promise<any[]>;
    addUser(message: NewAccountData): Promise<any>;
    check(idArray: any): Promise<ICheckLoginError | null>;
    checkPhone(idArray: any): Promise<ICheckPhoneError | null>;
    checkKey(idArray: any): Promise<ICheckKeyError | null>;
    checkEmail(idArray: any): Promise<ICheckEmailError | null>;
    putUserData(user: Users): Promise<any>;
    putUserPassword(password: any): Promise<any>;
    putUserLogin(login: any): Promise<any>;
    putUserKey(key: any): Promise<any>;
}
