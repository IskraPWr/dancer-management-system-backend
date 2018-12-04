import { Get, Header, Controller } from '@nestjs/common';

@Controller('presence')
export class PresenceController {
  @Get(':id')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findOne(): Array<object> {
    return [
            {
             week: '19.11.2018 - 25.11.2018',
              mon: '',
              tue: '',
              wed: '|',
              thu: '',
              fri: '',
              sat: '',
              sun: '',
            },
            {
                week: '19.11.2018 - 25.11.2018',
              mon: '',
              tue: '',
              wed: '|',
              thu: '',
              fri: '',
              sat: '',
              sun: '',
            },
            {
                week: '19.11.2018 - 25.11.2018',
              mon: '',
              tue: '||',
              wed: '',
              thu: '',
              fri: '',
              sat: '|',
              sun: '',
            },
      ];
  }

  @Get()
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findAll(): Array<object> {
    return [
      {
        week: {value: 'week-0', viewValue: '19.11.2018 - 25.11.2018'},
        data: [
          {
            name: 'Grzegorz',
            surname: 'Kikut',
            mon: '',
            tue: '',
            wed: '|',
            thu: '',
            fri: '',
            sat: '',
            sun: '',
            notes: ['kon'],
          },
          {
            name: 'Marzena',
            surname: 'Ozimek',
            mon: '',
            tue: '',
            wed: '|',
            thu: '',
            fri: '',
            sat: '',
            sun: '',
            notes: [],
          },
          {
            name: 'Piotr',
            surname: 'Nowak',
            mon: '',
            tue: '||',
            wed: '',
            thu: '',
            fri: '',
            sat: '|',
            sun: '',
            notes: [],
          },
        ],
      },
    ];
  }
}
