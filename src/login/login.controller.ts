import { Get, Controller, Post, Body, Header } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('login')
export class LoginController {
  constructor(private users: UsersService) {
  }
  @Post()
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  login(@Body() message): Promise<object> {
    return this.users.login(message);
  }
}
