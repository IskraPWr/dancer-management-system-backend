import { LogIn } from './../../validators/validators';
import { Get, Controller, Post, Body, Header } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('login')
export class LoginController {
  constructor(private users: UsersService) {
  }
  @Post()
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', '*')
  login(@Body() message: LogIn): Promise<any> {
    return this.users.login(message);
  }
}
