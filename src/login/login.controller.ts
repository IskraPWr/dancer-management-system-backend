import { Get, Controller } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Get()
  findAll(): object {
    return {
      kon : 'pies',
      pies : 'kot',
    };
  }
}
