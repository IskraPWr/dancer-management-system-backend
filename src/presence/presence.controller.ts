import { PresenceService } from './presence.service';
import { UsersService } from './../users/users.service';
import { NotesService } from './../notes/notes.service';
import { Get, Header, Controller } from '@nestjs/common';

@Controller('presence')
export class PresenceController {
  constructor(private users: UsersService, private notes: NotesService, private presence: PresenceService) {
  }

  @Get(':id')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findOne(): Promise<object> {
    return null;
  }

  @Get()
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findAll() {

    return Promise.all([
      this.presence.findAllFromActiveUsers(),
      this.users.findUsersWithPresence(),
      this.notes.findAllFromActiveUsers(),
    ]).then(value => {
        const presenceQuantity = Object.keys(value[0]).length;
        const usersQuantity = Object.keys(value[1]).length;
        const notesQuantity = Object.keys(value[2]).length;
        const firstPresenceData = JSON.parse(JSON.stringify(value[0][0].time));
        const lastPresenceData = JSON.parse(JSON.stringify(value[0][presenceQuantity - 1].time));

        // tslint:disable-next-line:max-line-length
        const firstMondayFromPresenceData = value[0][0].time.getDay() === 0  ? new Date(value[0][0].time.setHours(0, 0, 0, 0) - 6 * 1000 * 60 * 60 * 24) : new Date((value[0][0].time.setHours(0, 0, 0, 0)) - (value[0][0].time.getDay() - 1) * 1000 * 60 * 60 * 24);
       // tslint:disable-next-line:max-line-length
        const lastSunDayFromPresenceData = value[0][presenceQuantity - 1].time.getDay() === 0  ? new Date(value[0][presenceQuantity - 1].time.setHours(23, 59, 59, 999)) : new Date((value[0][presenceQuantity - 1].time.setHours(23, 59, 59, 999)) + ( 7 - value[0][presenceQuantity - 1].time.getDay()) * 1000 * 60 * 60 * 24);

        value[0][0].time = firstPresenceData;
        value[0][presenceQuantity - 1].time = lastPresenceData;

        // tslint:disable-next-line:max-line-length
        const numberOfWeeks = Math.floor(((firstMondayFromPresenceData.valueOf() - lastSunDayFromPresenceData.valueOf()) / (1000 * 60 * 60 *  24)) / 7) + 2;
        let currentTimeOfMonday = firstMondayFromPresenceData;
        let currentTimeOfSunday =  new Date(currentTimeOfMonday.valueOf() + 7 * 1000 * 60 * 60 * 24 - 1);
        let begininningOfWeek = 0;
        let bufor;

        const data = [];

        for (let i = 0; i < numberOfWeeks; i++) {

          const obj = {
            week : {
              value: 'week-' + i,
              viewValue: currentTimeOfMonday + ' - ' + currentTimeOfSunday,
            },
            data: [],
          };
          for (let j = 0; j < usersQuantity; j++){
            const presenceArray = ['', '', '', '', '', '', ''];
            for (let k = begininningOfWeek; k < presenceQuantity; k++ ) {
              if (new Date(value[0][k].time) < currentTimeOfMonday){
                bufor = k;
                break;
              }
              if (value[1][j].id_user === value[0][k].id_user){
                presenceArray[new Date(value[0][k].time).getDay()] = presenceArray[new Date(value[0][k].time).getDay()] + '|';
              }
            }
            const objData = {
              name : value[1][j].name,
              surname : value[1][j].surname,
              mon: presenceArray[1],
              tue: presenceArray[2],
              wed: presenceArray[3],
              thu: presenceArray[4],
              fri: presenceArray[5],
              sat: presenceArray[6],
              sun: presenceArray[0],
              notes: [],
            };

            for (let l = 0; l < notesQuantity; l++){
              if (value[1][j].id_user === value[2][l].id_user) {
                objData.notes.push(value[2][l].note);
              }
            }

            obj.data.push(objData);
          }
          currentTimeOfMonday = new Date(currentTimeOfMonday.valueOf() - 7 * 1000 * 60 * 60 * 24 );
          currentTimeOfSunday = new Date(currentTimeOfSunday.valueOf() - 7 * 1000 * 60 * 60 * 24 );
          data.push(obj);
          begininningOfWeek = bufor;
        }

        return data;
    });

  }
}
