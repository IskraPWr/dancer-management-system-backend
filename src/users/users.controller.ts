import { Get, Param, Header, Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get(':id')
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findOne(@Param('id') id): Array<object>  {
        return [
            {
                name: 'Grzegorz',
                surname: 'Kikut',
                email: 'grzegorzkikut1@gmail.com',
                phone: '515951120',
                university: 'Politechnika Wrocławska',
                department: 'W12',
                year: '3',
                index: '227574',
                key1: '',
                key2: '',
            },
        ];
      }

    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findAll(): Array<object> {
        return [
            {
                name: 'Grzegorz',
                surname: 'Kikut',
                email: 'grzegorzkikut1@gmail.com',
                phone: '515951120',
                university: 'Politechnika Wrocławska',
                department: 'W12',
                year: '3',
                index: '227574',
                notes: [
                    'kon',
                ],
            },
            {
                name: 'Marzena',
                surname: 'Ozimek',
                email: 'sample@gmail.com',
                phone: '14141414',
                university: 'Politechnika Wrocławska',
                department: 'W2',
                year: '3',
                index: '214574',
                notes: [
                    'pies',
                    'kot',
                ],
            },
            {
                name: 'Piotr',
                surname: 'Nowak',
                email: 'nowak@gmail.com',
                phone: '648754785',
                university: 'Politechnika Wrocławska',
                department: 'W04',
                year: '1',
                index: '276415',
                notes: [

                ],
            },
        ];
    }
}
