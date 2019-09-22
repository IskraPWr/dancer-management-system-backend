import { PresenceService } from './presence.service';
import { UsersService } from './../users/users.service';
import { NotesService } from './../notes/notes.service';
import { Get, Header, Controller, Param } from '@nestjs/common';
import { GroupService } from '../group/group.service';

@Controller('presence')
export class PresenceController {
  constructor(private users: UsersService, private notes: NotesService, private presence: PresenceService, private group: GroupService) {
  }

  @Get(':id')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', '*')
  find(@Param('id') id): Promise<Array<object>> {
    return Promise.resolve(
      this.presence.findByIdUser(id),
    ).then(presences => {

      if(!presences[0]){
        return [];
      }
        const presenceQuantity = Object.keys(presences).length;
        const firstPresenceData = new Date(presences[0].time);
        const lastPresenceData = new Date(presences[presenceQuantity - 1].time);

        // tslint:disable-next-line:max-line-length
        const firstMondayFromPresenceData = presences[0].time.getDay() === 0  ? new Date(presences[0].time.setHours(0, 0, 0, 0) - 6 * 1000 * 60 * 60 * 24) : new Date((presences[0].time.setHours(0, 0, 0, 0)) - (presences[0].time.getDay() - 1) * 1000 * 60 * 60 * 24);
       // tslint:disable-next-line:max-line-length
        const lastSunDayFromPresenceData = presences[presenceQuantity - 1].time.getDay() === 0  ? new Date(presences[presenceQuantity - 1].time.setHours(23, 59, 59, 999)) : new Date((presences[presenceQuantity - 1].time.setHours(23, 59, 59, 999)) + ( 7 - presences[presenceQuantity - 1].time.getDay()) * 1000 * 60 * 60 * 24);

       // presences[0].time = firstPresenceData;
       // presences[presenceQuantity - 1].time = lastPresenceData;

        // tslint:disable-next-line:max-line-length
        const numberOfWeeks = Math.floor(((firstMondayFromPresenceData.valueOf() - lastSunDayFromPresenceData.valueOf()) / (1000 * 60 * 60 *  24)) / 7) + 2;
        let currentTimeOfMonday = firstMondayFromPresenceData;
        let currentTimeOfSunday =  new Date(currentTimeOfMonday.valueOf() + 7 * 1000 * 60 * 60 * 24 - 1);
        let begininningOfWeek = 0;
        let bufor;

        const data = [];

        for (let i = 0; i < numberOfWeeks; i++) {

          const presenceArray = ['', '', '', '', '', '', ''];
          for (let k = begininningOfWeek; k < presenceQuantity; k++ ) {
              if (new Date(presences[k].time) < currentTimeOfMonday){
                bufor = k;
                break;
              }
              presenceArray[new Date(presences[k].time).getDay()] = presenceArray[new Date(presences[k].time).getDay()] + '|';

            }

          const obj = {
              week : currentTimeOfMonday.toLocaleDateString() + ' - ' + currentTimeOfSunday.toLocaleDateString(),
              mon: presenceArray[1],
              tue: presenceArray[2],
              wed: presenceArray[3],
              thu: presenceArray[4],
              fri: presenceArray[5],
              sat: presenceArray[6],
              sun: presenceArray[0],
            };

          currentTimeOfMonday = new Date(currentTimeOfMonday.valueOf() - 7 * 1000 * 60 * 60 * 24 );
          currentTimeOfSunday = new Date(currentTimeOfSunday.valueOf() - 7 * 1000 * 60 * 60 * 24 );
          data.push(obj);
          begininningOfWeek = bufor;
        }

        return data;
    });

  }

  @Get()
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', '*')
  findAll() {

    return Promise.all([
      this.presence.findAllFromActiveUsers(),
      this.users.findUsersWithPresence(),
      this.notes.findAllFromActiveUsers(),
      this.group.findAllOrderById()
    ]).then(value => {

      if (value[0][0]) {
        const presenceQuantity = Object.keys(value[0]).length;
        const usersQuantity = Object.keys(value[1]).length;
        const notesQuantity = Object.keys(value[2]).length;
        const firstPresenceData = value[0][0].time;
        const lastPresenceData = value[0][presenceQuantity - 1].time;

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
            week : currentTimeOfMonday.toLocaleDateString() + ' - ' + currentTimeOfSunday.toLocaleDateString(),
            data: [],
          };

          for (let j = 0; j < usersQuantity; j++){
            const presenceArray = [new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array()];
            for (let k = begininningOfWeek; k < presenceQuantity; k++ ) {
              if (new Date(value[0][k].time) < currentTimeOfMonday){
                bufor = k;
                break;
              }
              if (value[1][j].id_user === value[0][k].id_user){
                value[0][k].id_group === 0 ?
                presenceArray[new Date(value[0][k].time).getDay()].push('Inne') :
                presenceArray[new Date(value[0][k].time).getDay()].push(value[3][value[0][k].id_group-1].name);
              }
            }
            const objData = {
              name : value[1][j].name,
              surname : value[1][j].surname,
              id: value[1][j].id_user,
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
                objData.notes.push({name: value[2][l].note});
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
      }
      return null;
    });

  }
}
