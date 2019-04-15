import { InstallmentDateService } from './instrallmentDate.service';
import { Get, Header, Controller, Post, Body } from '@nestjs/common';

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

    @Get('headers')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    getAllHeaders(): Promise<object> {
     return this.installmentDate.getAllHeaders();
    }

    @Get('details')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    getAllSemestersDetails(): Promise<object> {
     return this.installmentDate.getAllSemetersStartAndEnd();
    }

    @Post('change')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    changeDate(@Body() message): Promise<object> {
      return this.installmentDate.changeDate(message);
    }

    @Post('add')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    addDate(@Body() message): Promise<any> {
      return this.installmentDate.addDate(message);
    }

    @Post('remove')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    removeDate(@Body() message): Promise<any> {
      return this.installmentDate.removeDate(message);
    }
}
