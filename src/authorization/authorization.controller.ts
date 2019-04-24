import { AuthorizationService } from './authorization.service';
import { Controller, Get, Header, Post, Body } from '@nestjs/common';

@Controller('authorization')
export class AuthorizationController {
    constructor(private authorization: AuthorizationService) {
    }
    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findAll(): Promise<Array<object>> {
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
    @Header('access-control-allow-origin', 'http://localhost:4200')
    removeAdmins(@Body() message): Promise<any>{
        return this.authorization.removeAdmins(message)
    }

    @Post('change')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    changeDate(@Body() message): Promise<object> {
      return this.authorization.changeDate(message);
    }

    @Post('add')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    addDate(@Body() message): Promise<any> {
      return this.authorization.addDate(message);
    }

    @Post('generate')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    generatePass(@Body() message): Promise<any> {
      return this.authorization.generatePass(message);
    }
}