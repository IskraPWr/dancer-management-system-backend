import { Controller, Get, Header } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('logout')
export class LogoutController {
    constructor(private users: UsersService) {
    }
    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', '*')
    logout() {
      return this.users.logout();
    }
  }
