import { Get, Controller } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Get()
  findAll(): string {
    return 'kon';
  }
}
