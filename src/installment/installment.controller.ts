import { InstallmentService } from './installment.service';
import { Controller, Get, Header, Post, Body } from '@nestjs/common';

@Controller('installment')
export class InstallmentController {
    constructor(private installment: InstallmentService) {
    }

    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findAll(): Promise<object> {
     return Promise.all([
         this.installment.findType0(),
         this.installment.findType1(),
     ]).then(value => {
         return {
             type0 : {
                 name: 'Osoby z PWr',
                 data: value[0],
             },
             type1: {
                 name: 'Osoby z poza PWr',
                 data: value[1],
                },
         };
     });
    }

    @Post('remove')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    removeDate(@Body() message): Promise<any> {
      return this.installment.removeDate(message);
    }

    @Post('change')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    changeDate(@Body() message): Promise<object> {
      return this.installment.changeDate(message);
    }

    @Post('add')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    addDate(@Body() message): Promise<any> {
      return this.installment.addDate(message);
    }
}
