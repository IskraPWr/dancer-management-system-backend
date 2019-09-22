import { ListService } from './list.service';
import { Get, Param, Header, Controller } from '@nestjs/common';

@Controller('list')
export class ListController {
  constructor(private db: ListService) {
  }
    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', '*')
    findAll(): Promise<object> {
     return this.db.findAll();
    }
}
