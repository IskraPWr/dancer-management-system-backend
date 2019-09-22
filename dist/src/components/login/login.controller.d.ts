import { LogIn } from './../../validators/validators';
import { UsersService } from '../users/users.service';
export declare class LoginController {
    private users;
    constructor(users: UsersService);
    login(message: LogIn): Promise<any>;
}
