import { AuthorizationService } from './authorization.service';
import { Controller, Get, Header, Post, Body } from '@nestjs/common';

@Controller('authorization')
export class AuthorizationController {
    constructor(private authorization: AuthorizationService) {
    }
    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', '*')
    findAll() {
        return Promise.resolve(this.authorization.findAll()).then(data => {
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
    removeAdmins(@Body() message){
        return this.authorization.removeAdmins(message);
    }

    @Post('change')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', '*')
    changeDate(@Body() message) {
      return this.authorization.changeDate(message);
    }

    @Post('add')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', '*')
    addDate(@Body() message){
      return this.authorization.addDate(message);
    }

    @Post('generate')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', '*')
    generatePass(@Body() message) {
      return this.authorization.generatePass(message);
    }

    @Post('check')
    checkPass(@Body() message){
      return this.authorization.checkPass(message);
    }
}