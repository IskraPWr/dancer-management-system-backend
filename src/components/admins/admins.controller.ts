import { AdminsService } from './admins.service';
import { Controller, Get, Header, Post, Body } from '@nestjs/common';

@Controller('admins')
export class AdminsController {
    constructor(private admins: AdminsService) {
    }
    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', '*')
    findAll(): Promise<Array<object>> {
        return Promise.resolve(this.admins.findAll()).then(data => {
            for (let i = 0; i < Object.keys(data).length; i++){
                let buffer = '';
                // tslint:disable-next-line:prefer-for-of
                for (let j = 0; j < 10; j++){
                    buffer += '*';
                }
                data[i].password = buffer;
            }
            return data;
        });
    }

    @Post('remove')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', '*')
    removeAdmins(@Body() message): Promise<any> {
        return this.admins.removeAdmins(message)
    }

    
    @Post('change')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', '*')
    changeDate(@Body() message) {
      return this.admins.changeDate(message);
    }

    @Post('add')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', '*')
    addDate(@Body() message): Promise<any> {
      return this.admins.addDate(message);
    }

    @Post('generate')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', '*')
    generatePass(@Body() message): Promise<any> {
      return this.admins.generatePass(message);
    }

    @Post('check')
    checkPass(@Body() message): Promise<any> {
      return this.admins.checkPass(message);
    }
}