import { UsersService } from '../users/users.service';
export declare class LogoutController {
    private users;
    constructor(users: UsersService);
    logout(): Promise<void>;
}
