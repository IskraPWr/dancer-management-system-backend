import { GroupService } from './group.service';
import { Get, Header, Controller } from '@nestjs/common';

@Controller('groups')
export class GroupController {
  constructor(private group: GroupService) {
  }
    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findAll(): Promise<object> {
     return this.group.findAll();
    }
}
