import { Get, Header, Controller } from '@nestjs/common';

@Controller('charges')
export class ChargesController {
    @Get()
    @Header('access-control-allow-credentials', 'true')
    @Header('access-control-allow-origin', 'http://localhost:4200')
    findAll(): Array<object> {
      return [
        {
            id: '5',
            name: 'Grzegorz',
            surname: 'Kikut',
            declaration: '',
            entryFee: '',
            payment1: '',
            payment2: '|',
            payment3: '',
            sum: '',
            notes: ['kon'],
          },
          {
            id: '7',
            name: 'Marzena',
            surname: 'Ozimek',
            declaration: '',
            entryFee: '',
            payment1: '',
            payment2: '|',
            payment3: '',
            sum: '',
            notes: [],
          },
          {
            id: '4',
            name: 'Piotr',
            surname: 'Nowak',
            declaration: '',
            entryFee: '',
            payment1: '',
            payment2: '|',
            payment3: '',
            sum: '',
            notes: [],
          },
      ];
    }
}
