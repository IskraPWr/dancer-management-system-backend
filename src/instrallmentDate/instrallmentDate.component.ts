import { InstallmentDateService } from './instrallmentDate.service';
import { Get, Header, Controller } from '@nestjs/common';

@Controller('semesters')
export class InstallmentDateController {
  constructor(private installmentDate: InstallmentDateService) {
  }
    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findAll(): Promise<object> {
     return this.installmentDate.findAll();
    }
}
