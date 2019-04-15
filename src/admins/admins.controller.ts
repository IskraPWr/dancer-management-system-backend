import { AdminsService } from './admins.service';
import { Controller, Get, Header } from '@nestjs/common';

@Controller('admins')
export class AdminsController {
    constructor(private admins: AdminsService) {
    }
    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findAll(): Promise<Array<object>> {
        return Promise.resolve(this.admins.findAll()).then(data => {
            for (let i = 0; i < Object.keys(data).length; i++){
                let buffer = '';
                // tslint:disable-next-line:prefer-for-of
                for (let j = 0; j < data[i].password.length; j++){
                    buffer += '*';
                }
                data[i].password = buffer;
            }
            return data;
        });
    }
}