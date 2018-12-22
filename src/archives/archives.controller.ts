import { UsersService } from './../users/users.service';
import { Get, Header, Controller } from '@nestjs/common';

@Controller('archives')
export class ArchivesController {
  constructor(private db: UsersService) {
  }

  @Get()
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findAll(): Promise<object> {
   return this.db.findAllInactive();
  }
}
