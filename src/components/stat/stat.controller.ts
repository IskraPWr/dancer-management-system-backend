import { InstallmentService } from './../installment/installment.service';
import { InstallmentDateService } from './../instrallmentDate/instrallmentDate.service';
import { GroupService } from './../group/group.service';
import { PresenceService } from './../presence/presence.service';
import { Controller, Get, Header, Param } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { StatService } from './stat.service';
import { IPresenceStat, IPresenceStat2 } from 'src/typings/typings';

@Controller('statistics')
export class StatisticsUniversityController {
  constructor(
    private user: UsersService,
    private users: UsersService,
    private presence: PresenceService,
    private semesters: InstallmentDateService,
    private groups: GroupService,
    private stat: StatService
  ) {}

  @Get('universities')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', '*')
  findUniversities(): Promise<Array<object>> {
    return Promise.resolve(this.user.findAllActive()).then(value => {
      const data = [];

      let found = false;
      for (const user of value) {
        const university = {
          name: null,
          value: null,
        };

        for (const array of data) {
          if (array.name === user.university) {
            array.value++;
            found = true;
            break;
          }
        }

        if (found === true) {
          found = false;
        } else {
          university.name = user.university;
          university.value++;
          data.push(university);
        }
      }
      return data;
    });
  }

  @Get('presence/all/:id')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', '*')
  findPresenceAll(@Param('id') id): Promise<Array<object>> {
    return Promise.resolve(this.presence.findByIdUser(id)).then(presence => {
      const presenceQuantity = Object.keys(presence).length;
      const days = [
        'Niedziela',
        'Poniedziałek',
        'Wtorek',
        'Środa',
        'Czwartek',
        'Piątek',
        'Sobota',
      ];
      const data = [];
      for (let i = 0; i < 7; i++) {
        const day = {
          day: days[i],
          data: 0,
        };
        data.push(day);
      }

      for (let i = 0; i < presenceQuantity; i++) {
        data[new Date(presence[i].time).getDay()].data++;
      }

      const buffer = data.shift();
      data.push(buffer);
      return data;
    });
  }
  @Get('gender')
  findAllGender(): Promise<Array<object>> {
    return Promise.resolve(this.user.findAllActive()).then(value => {
      let male = 0;
      let female = 0;
      for (const obj of value) {
        obj.gender === 0 ? female++ : male++;
      }
      return [{ gender: 'male', value: male }, { gender: 'female', value: female }];
    });
  }

  @Get('gender/gender')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', '*')
  findGender(): Promise<Array<object>> {
    return Promise.resolve(this.user.findAllActive()).then(value => {
      let male = 0;
      let female = 0;
      for (const obj of value) {
        obj.gender === 0 ? female++ : male++;
      }
      return [{ name: 'male', value: male }, { name: 'female', value: female }];
    });
  }

  @Get('charges')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', '*')
  findCharges(): Promise<Array<object>> {
    return Promise.resolve(this.user.findAllActive()).then(value => {
      const data = [];
      const array: Array<number> = [0, 0, 0, 0, 0, 0, 0];
      const name = [
        '1 blok',
        '2 bloki',
        '3 bloki',
        '4 bloki',
        '5 bloków',
        '6 bloków',
        'BO',
      ];
      for (const user of value) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < name.length; i++) {
          if (user.declaration > 0 && user.declaration <= name.length) {
            array[user.declaration - 1]++;
            break;
          }
        }
      }
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < name.length; j++) {
        const obj = {
          name: name[j],
          value: array[j],
        };
        data.push(obj);
      }
      return data;
    });
  }

  @Get('archives/gender')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', '*')
  findGenderInArchives(): Promise<Array<object>> {
    return Promise.resolve(this.user.findAllInactive()).then(value => {
      let male = 0;
      let female = 0;
      for (const user of value) {
        user.gender === 0 ? female++ : male++;
      }
      return [{ name: 'male', value: male }, { name: 'female', value: female }];
    });
  }

  @Get('people/:id/:id_semester')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', '*')
  find(@Param('id') id, @Param('id_semester') id_semester) {
    // tslint:disable-next-line:max-line-length
    return Promise.all([
      this.presence.findAllFromSemesterById(id, id_semester),
      this.groups.findAllBySemesterId(id_semester),
    ]).then(([presences, groups]) => {
      const presenceQuantity = Object.keys(presences).length;
      const groupQuantity = Object.keys(groups).length;
      const dataGroups = new Array(groupQuantity + 1);

      for (let k = 0; k < groupQuantity; k++) {
        dataGroups[k] = {
          name: groups[k].name,
          data: 0,
        };
      }
      dataGroups[groupQuantity] = {
        name: 'Inne',
        data: 0,
      };

      for (let i = 0; i < presenceQuantity; i++) {
        let isFound = false;

        for (let j = 0; j < groupQuantity; j++) {
          // through all groups
          if (presences[i].id_group === groups[j].id) {
            isFound = true;
            dataGroups[j].data++;
            break;
          }
        }

        if (isFound === false) {
          dataGroups[groupQuantity].data++;
        }
      }
      return dataGroups;
    });
  }

  @Get('people')
  getPresence(): Promise<IPresenceStat2> {
     return this.stat.getAllPresenceStat();
  }

  @Get('presence/:id')
  findPresence(@Param('id') id) {
    return this.stat.getPresenceStat(id);
  }
}
