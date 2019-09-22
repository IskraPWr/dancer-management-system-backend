import { UsersService } from './../users/users.service';
import { Get, Header, Controller, Post, Body } from '@nestjs/common';

@Controller('archives')
export class ArchivesController {
  constructor(private db: UsersService) {
  }

  @Get()
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', '*')
  findAll(): Promise<object> {
   return this.db.findAllInactive();
  }

  @Post('add')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', '*')
  add(@Body() idArray): Promise<object> {
   return this.db.addToArchive(idArray);
  }

  @Post('revert')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', '*')
  revert(@Body() idArray): Promise<object> {
   return this.db.unarchiveUsers(idArray);
  }
}
