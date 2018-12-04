import { Get, Header, Controller } from '@nestjs/common';

@Controller('statistics/universities')
export class StatisticsUniversityController {
  @Get()
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findAll(): Array<object> {
    return [
      { name: 'Akademia Muzyczna we Wrocławiu', value: 96 },
      { name: 'Akademia Sztuk Pięknych we Wrocławiu', value: 96 },
    ];
  }
}

@Controller('statistics/presence/week')
export class StatisticsPresenceWeekByIdController {
    @Get(':id')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findAll(): Array<object> {
    return [
        {
            grupB1: '3',
            grupB2: '3',
            grupBP: '3',
            grupIntMon: '3',
            grupIntWed: '3',
            grupAdvMon: '3',
            grupAdvWed: '3',
            grupUnknown: '3',
        },
      ];
  }
}

@Controller('statistics/presence/month')
export class StatisticsPresenceMonthByIdController {
@Get(':id')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findAll(): Array<object> {
    return [
        {
            grupB1: '3',
            grupB2: '3',
            grupBP: '3',
            grupIntMon: '3',
            grupIntWed: '3',
            grupAdvMon: '3',
            grupAdvWed: '3',
            grupUnknown: '3',
        },
      ];
  }
}

@Controller('statistics/presence/semestr')
export class StatisticsPresenceSemestrByIdController {
 @Get(':id')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findAll(): Array<object> {
    return [
        {
            grupB1: '3',
            grupB2: '3',
            grupBP: '3',
            grupIntMon: '3',
            grupIntWed: '3',
            grupAdvMon: '3',
            grupAdvWed: '3',
            grupUnknown: '3',
        },
      ];
  }
}

@Controller('statistics/presence/all')
export class StatisticsPresenceAllByIdController {
  @Get(':id')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findAll(): Array<object> {
    return [
        {
            grupB1: '3',
            grupB2: '3',
            grupBP: '3',
            grupIntMon: '3',
            grupIntWed: '3',
            grupAdvMon: '3',
            grupAdvWed: '3',
            grupUnknown: '3',
        },
      ];
  }
}

@Controller('statistics/gender')
export class StatisticsGenderController {
  @Get()
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findAll(): Array<object> {
    return [{ name: 'male', value: 6 }, { name: 'female', value: 96 }];
  }
}

@Controller('statistics/charges')
export class StatisticsChargesController {
  @Get()
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findAll(): Array<object> {
    return [
      { b1: 6,
        b2: 9,
       b3: 94,
       b4: 26,
       b5: 94,
       b6: 946,
       wl: 6,
      },
    ];
  }
}

@Controller('statistics/archives/gender')
export class StatisticsArchivesGenderController {
  @Get()
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findAll(): Array<object> {
    return [{ name: 'male', value: 26 }, { name: 'female', value: 96 }];
  }
}

@Controller('statistics/people')
export class StatisticsPeopleController {
  @Get()
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findAll(): Array<object> {
    return [
      {
        lastWeek: {
          men: [
            {
              mon: 2,
              tue: 3,
              wed: 4,
              thu: 5,
              fri: 6,
              sat: 7,
              sun: 8,
            },
          ],
          women: [
            {
              mon: 2,
              tue: 3,
              wed: 4,
              thu: 5,
              fri: 6,
              sat: 7,
              sun: 8,
            },
          ],
        },
        lastMonth: {
          men: [
            {
              mon: 2,
              tue: 3,
              wed: 4,
              thu: 5,
              fri: 6,
              sat: 7,
              sun: 8,
            },
          ],
          women: [
            {
              mon: 2,
              tue: 3,
              wed: 4,
              thu: 5,
              fri: 6,
              sat: 7,
              sun: 8,
            },
          ],
        },
        lastSemestr: {
          men: [
            {
              mon: 2,
              tue: 3,
              wed: 4,
              thu: 5,
              fri: 6,
              sat: 7,
              sun: 8,
            },
          ],
          women: [
            {
              mon: 2,
              tue: 3,
              wed: 4,
              thu: 5,
              fri: 6,
              sat: 7,
              sun: 8,
            },
          ],
        },
        allTime: {
          men: [
            {
              mon: 2,
              tue: 3,
              wed: 4,
              thu: 5,
              fri: 6,
              sat: 7,
              sun: 8,
            },
          ],
          women: [
            {
              mon: 2,
              tue: 3,
              wed: 4,
              thu: 5,
              fri: 6,
              sat: 7,
              sun: 8,
            },
          ],
        },
        grupB1: {
            men: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
            women: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
          },
          grupB2: {
            men: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
            women: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
          },
          grupIntMon: {
            men: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
            women: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
          },
          grupIntWed: {
            men: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
            women: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
          },
          grupAdvMon: {
            men: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
            women: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
          },
          grupAdvWed: {
            men: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
            women: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
          },
          grupBP: {
            men: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
            women: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
          },
          grupUnknown: {
            men: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
            women: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
          },
          dayMon: {
            men: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
            women: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
          },
          dayTue: {
            men: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
            women: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
          },
          dayWed: {
            men: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
            women: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
          },
          dayThu: {
            men: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
            women: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
          },
          dayFri: {
            men: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
            women: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
          },
          daySat: {
            men: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
            women: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
          },
          daySun: {
            men: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
            women: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
          },
          weeks: {
            men: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
            women: [
              {
                mon: 2,
                tue: 3,
                wed: 4,
                thu: 5,
                fri: 6,
                sat: 7,
                sun: 8,
              },
            ],
          },
      },
    ];
  }
}