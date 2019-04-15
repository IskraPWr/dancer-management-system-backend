import { InstallmentService } from './../installment/installment.service';
import { InstallmentDateService } from './../instrallmentDate/instrallmentDate.service';
import { GroupService } from './../group/group.service';
import { PresenceService } from './../presence/presence.service';
import { Controller, Get, Header, Param } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('statistics')
export class StatisticsUniversityController {
  constructor(private user: UsersService, private users: UsersService, private presence: PresenceService, private semesters: InstallmentDateService, private groups: GroupService) {}
  @Get('universities')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
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
  @Get('presence/:id')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findPresence(@Param('id') id): Promise<Array<object>> {
    return Promise.all([
      this.presence.findByIdUser(id),
      this.semesters.findAll(),
      this.groups.findAll(),
    ]).then(([presences, semesters, groups]) => {
      const presenceQuantity = Object.keys(presences).length;
      const semestersQuantity = Object.keys(semesters).length;
      const now = new Date();
      const days = [
        'Niedziela',
        'Poniedziałek',
        'Wtorek',
        'Środa',
        'Czwartek',
        'Piątek',
        'Sobota',
      ];

      /*function compareTime(compareMethod: string, offset: number, numbers: Array<any>): boolean{
          const bufor1 = [new Date (numbers[0]).getHours(), new Date (numbers[0]).getMinutes(), new Date (numbers[0]).getSeconds()];
          numbers[0] = bufor1[0] * 60 * 60 + bufor1[1] * 60 + bufor1[2];
          const bufor2 = numbers[1].split(':');
          numbers[1] = parseInt(bufor2[0], 10) * 60 * 60 + parseInt(bufor2[1], 10) * 60 + parseInt(bufor2[2], 10);

          // use offset
          numbers[1] = numbers[1] +  offset * 60;

          // use method
          if (compareMethod === '>='){
            if (numbers[0] >= numbers[1]) return true;
            else return false;
          } else if (compareMethod === '<='){
            if (numbers[0] <= numbers[1]) return true;
            else return false;
          } else return false;
        }*/

      function getCurrentMonth() {
        let firstDayOfMonth = new Date(
          new Date(now.setDate(1)).setHours(0, 0, 0, 0),
        );
        let lastDayOfMonth = new Date(
          new Date(now.setMonth(now.getMonth() + 1, 0)).setHours(
            23,
            59,
            59,
            999,
          ),
        );
        let isFound = false;
        let currentSemesterId;

        const data = {
          name: 'lastMonth',
          data: [],
        };

        function findGroupsById(element) {
          if (element.id_semester === currentSemesterId) return true;
        }

        for (let i = 0; i < semestersQuantity; i++) {
          if (
            semesters[i].start <= firstDayOfMonth &&
            semesters[i].end >= lastDayOfMonth
          ) {
            isFound = true;
            currentSemesterId = semesters[i].id_semester;
            break;
          } else if (
            semesters[i].start > firstDayOfMonth &&
            semesters[i].end >= lastDayOfMonth
          ) {
            isFound = true;
            firstDayOfMonth = semesters[i].start;
            currentSemesterId = semesters[i].id_semester;
            break;
          } else if (
            semesters[i].start <= firstDayOfMonth &&
            semesters[i].end < lastDayOfMonth
          ) {
            isFound = true;
            lastDayOfMonth = semesters[i].end;
            currentSemesterId = semesters[i].id_semester;
            break;
          }
        }

        if (isFound === true) {
          const currentGroups = groups.filter(findGroupsById);

          const dataGroups = new Array(currentGroups.length + 1);
          // tslint:disable-next-line:prefer-for-of
          for (let k = 0; k < currentGroups.length; k++) {
            dataGroups[k] = {
              name: currentGroups[k].name,
              data: 0,
            };
          }
          dataGroups[currentGroups.length] = {
            name: 'Inne',
            data: 0,
          };

          for (let i = 0; i < presenceQuantity; i++) {
            if (
              presences[i].time > firstDayOfMonth &&
              presences[i].time <= lastDayOfMonth
            ) {
              let isFoundGroup = false;

              /*  for (let j = 0; j < currentGroups.length; j++){ // through all groups
                  if (new Date(presences[i].time).getDay()  === currentGroups[j].day){
                    // tslint:disable-next-line:max-line-length
                     if (compareTime('>=', -30, [presences[i].time, currentGroups[j].start]) && compareTime('<=', -30, [presences[i].time, currentGroups[j].end])){
                      isFoundGroup = true;
                      // count people in defined hours
                      dataGroups[j].data ++;
                     }
                  }
                }*/

              for (let j = 0; j < currentGroups.length; j++) {
                // through all groups
                if (presences[i].id_group === currentGroups[j].id) {
                  isFoundGroup = true;

                  dataGroups[j].data++;
                }
              }

              // count people in undefined hours
              if (isFoundGroup === false) {
                dataGroups[currentGroups.length].data++;
              }
            } else if (presences[i].time < firstDayOfMonth) {
              break;
            }
          }
          data.data = dataGroups;
          return data;
        } else {
          return data;
        }
      }

      function getAllSemesters() {
        let firstDayOfCurrentSemester = new Date(semesters[0].start);
        let lastDayOfCurrentSemester = new Date(semesters[0].end);
        let currentSemesterArrayPosition = 0;
        let currentSemesterId =
          semesters[currentSemesterArrayPosition].id_semester;
        let currentSemesterName = semesters[currentSemesterArrayPosition].name;
        let currentGroups = groups.filter(findGroupsById);
        let dataGroups;
        const semester = new Array(semestersQuantity);

        const data = {
          name: 'allSemestersGroups',
          data: [],
        };

        for (let i = 0; i < semestersQuantity; i++) {
          semester[i] = {
            name: semesters[i].name,
            data: [],
          };
        }

        function findGroupsById(element) {
          if (element.id_semester === currentSemesterId) return true;
        }

        function resetGroup() {
          dataGroups = new Array(currentGroups.length + 1);
          // tslint:disable-next-line:prefer-for-of
          for (let k = 0; k < currentGroups.length; k++) {
            dataGroups[k] = {
              name: currentGroups[k].name,
              data: 0,
            };
          }
          dataGroups[currentGroups.length] = {
            name: 'Inne',
            data: 0,
          };
        }

        resetGroup();
        for (let i = 0; i < presenceQuantity; i++) {
          if (
            presences[i].time >= firstDayOfCurrentSemester &&
            presences[i].time <= lastDayOfCurrentSemester
          ) {
            let isFound = false;
            /* for (let j = 0; j < currentGroups.length; j++){ // through all groups
                  if (new Date(presences[i].time).getDay()  === currentGroups[j].day){
                    // tslint:disable-next-line:max-line-length
                     if (compareTime('>=', -30, [presences[i].time, currentGroups[j].start]) && compareTime('<=', -30, [presences[i].time, currentGroups[j].end])){
                      isFound = true;
                      // count people in defined hours
                      dataGroups[j].data ++;
                     }
                  }
               }*/

            for (let j = 0; j < currentGroups.length; j++) {
              // through all groups
              if (presences[i].id_group === currentGroups[j].id) {
                isFound = true;

                dataGroups[j].data++;
              }
            }

            // count people in undefined hours
            if (isFound === false) {
              dataGroups[currentGroups.length].data++;
            }
          } else if (presences[i].time < firstDayOfCurrentSemester) {
            if (currentSemesterArrayPosition + 1 < semestersQuantity) {
              // push last data
              semester[currentSemesterArrayPosition].data = dataGroups;

              // change semester
              currentSemesterArrayPosition++;
              firstDayOfCurrentSemester = new Date(
                semesters[currentSemesterArrayPosition].start,
              );
              lastDayOfCurrentSemester = new Date(
                semesters[currentSemesterArrayPosition].end,
              );
              // tslint:disable-next-line:max-line-length

              currentSemesterId =
                semesters[currentSemesterArrayPosition].id_semester;
              currentSemesterName =
                semesters[currentSemesterArrayPosition].name;
              currentGroups = groups.filter(findGroupsById);

              // reset arrays
              resetGroup();

              i--; // repeat for this presence log
            } else {
              break;
            }
          }
        }
        //// after last presence log

        // push last semester
        semester[currentSemesterArrayPosition].data = dataGroups;
        data.data = semester; // push semester to data

        return data;
      }

      function getAllDays() {
        const data = {
          name: 'allVisits',
          data: [],
        };
        for (let i = 0; i < 7; i++) {
          const day = {
            day: days[i],
            data: 0,
          };
          data.data.push(day);
        }
        for (let i = 0; i < presenceQuantity; i++) {
          data.data[new Date(presences[i].time).getDay()].data++;
        }
        const buffer = data.data.shift();
        data.data.push(buffer);
        return data;
      }
      return [getCurrentMonth(), getAllSemesters(), getAllDays()];
    });
  }

  @Get('presence/all/:id')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
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
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findAllGender(): Promise<Array<object>> {
    return Promise.resolve(this.user.findAllActive()).then(value => {
      let male = 0;
      let female = 0;
      for (const obj of value) {
        obj.gender === 0 ? female++ : male++;
      }
      return [{ name: 'male', value: male }, { name: 'female', value: female }];
    });
  }

  @Get('gender/gender')
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
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
  @Header('access-control-allow-origin', 'http://localhost:4200')
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
  @Header('access-control-allow-origin', 'http://localhost:4200')
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
  @Header('access-control-allow-origin', 'http://localhost:4200')
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
  @Header('access-control-allow-credentials', 'true')
  @Header('access-control-allow-origin', 'http://localhost:4200')
  findAll(): Promise<Array<object>> {
    return Promise.all([
      this.presence.findAllFromActiveUsers(),
      this.groups.findAll(),
      this.semesters.findAll(),
      this.users.findAllActive(),
    ]).then(([presence, group, semesters, users]) => {
      const presenceQuantity = Object.keys(presence).length;
      const groupQuantity = Object.keys(group).length;
      const semestersQuantity = Object.keys(semesters).length;
      const usersQuantity = Object.keys(users).length;
      const now = new Date();
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      //emergency exit
      if (usersQuantity === 0 || semestersQuantity === 0) {
        return null;
      }

      let presenceIdCurrent;
      function findUser(element) {
        if (element.id_user === presenceIdCurrent) return true;
        else return false;
      }
      /// counting functions

      function countPresence(
        appellative: string,
        start: Date,
        end: Date,
      ): object {
        const array = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
        for (let i = 0; i < presenceQuantity; i++) {
          if (presence[i].time >= start && presence[i].time <= end) {
            presenceIdCurrent = presence[i].id_user;
            if (users.find(findUser).gender === 1) {
              array[0][presence[i].time.getDay()]++;
            } else {
              array[1][presence[i].time.getDay()]++;
            }
          } else if (presence[i].time < start) {
            break;
          }
        }

        const obj = {
          name: appellative,
          data: [],
        };

        for (let j = 0; j < 7; j++) {
          const day = {
            name: days[j],
            man: array[0][j],
            woman: array[1][j],
          };
          obj.data.push(day);
        }
        return obj;
      }

      function lastWeek(): object {
        // tslint:disable-next-line:max-line-length
        const beginningOfMonday =
          now.getDay() === 0
            ? new Date(now.setHours(0, 0, 0, 0) - 6 * 1000 * 60 * 60 * 24)
            : new Date(
                now.setHours(0, 0, 0, 0) -
                  (now.getDay() - 1) * 1000 * 60 * 60 * 24,
              );
        // tslint:disable-next-line:max-line-length
        const endOfSunday =
          now.getDay() === 0
            ? new Date(now.setHours(23, 59, 59, 999))
            : new Date(
                now.setHours(23, 59, 59, 999) +
                  (7 - now.getDay()) * 1000 * 60 * 60 * 24,
              );
        return countPresence('lastWeek', beginningOfMonday, endOfSunday);
      }

      function lastMonth(): object {
        const firstDayOfMonth = new Date(
          new Date(now.setDate(1)).setHours(0, 0, 0, 0),
        );
        const lastDayOfMonth = new Date(
          new Date(now.setMonth(now.getMonth() + 1, 0)).setHours(
            23,
            59,
            59,
            999,
          ),
        );
        return countPresence('lastMonth', firstDayOfMonth, lastDayOfMonth);
      }

      function lastSemestr(): object {
        const firstDayOfSemester = new Date(semesters[0].start);
        const lastDayOfSemester = new Date(semesters[0].end);
        return countPresence(
          'lastSemester',
          firstDayOfSemester,
          lastDayOfSemester,
        );
      }

      function allTime() {
        const veryFarBack = new Date(2000, 0, 0);
        const veryFarForward = new Date(3000, 0, 0);
        return countPresence('allTime', veryFarBack, veryFarForward);
      }

      ///// funkcja master generująca wszystkie grupy
      function groups() {
        // const
        // tslint:disable-next-line:no-shadowed-variable
        const now = new Date();
        const data = {
          name: 'groups and days',
          data: [],
        };

        // let
        let firstDayOfCurrentSemester = new Date(semesters[0].start);
        let lastDayOfCurrentSemester = new Date(semesters[0].end);
        // tslint:disable-next-line:max-line-length
        let firstDayOfCurrentWeek =
          now.getDay() === 0
            ? new Date(now.setHours(0, 0, 0, 0) - 6 * 1000 * 60 * 60 * 24)
            : new Date(
                now.setHours(0, 0, 0, 0) -
                  (now.getDay() - 1) * 1000 * 60 * 60 * 24,
              );
        // tslint:disable-next-line:max-line-length
        let lastDayOfCurrentWeek =
          now.getDay() === 0
            ? new Date(now.setHours(23, 59, 59, 999))
            : new Date(
                now.setHours(23, 59, 59, 999) +
                  (7 - now.getDay()) * 1000 * 60 * 60 * 24,
              );
        let currentSemesterId = semesters[0].id_semester;
        let currentSemesterName = semesters[0].name;
        let currentGroups = group.filter(findGroupsById);
        let currentSemesterArrayPosition = 0;

        let dataGroups: Array<any> = new Array(currentGroups.length + 1);
        let dataDays: Array<any> = new Array(7);
        let type;
        let semester;

        let whatGender;

        // functions
        function resetArrays() {
          dataGroups = new Array(currentGroups.length + 1);
          dataDays = new Array(7);

          type = {
            week: '',
            groups: [],
            days: [],
          };

          for (let k = 0; k < currentGroups.length; k++) {
            dataGroups[k] = {
              name: currentGroups[k].name,
              date: '',
              man: 0,
              woman: 0,
            };
          }
          dataGroups[currentGroups.length] = {
            name: 'Inne',
            man: 0,
            woman: 0,
          };

          for (let k = 0; k < dataDays.length; k++) {
            dataDays[k] = {
              day: days[k],
              date: '',
              man: 0,
              woman: 0,
            };
          }
        }
        function resetSemester() {
          semester = {
            name: currentSemesterName,
            id_semester: currentSemesterId,
            data: [],
          };
        }

        function findGroupsById(element) {
          if (element.id_semester === currentSemesterId) return true;
        }

        /*function compareTime(compareMethod: string, offset: number, numbers: Array<any>): boolean{
        const bufor1 = [new Date (numbers[0]).getHours(), new Date (numbers[0]).getMinutes(), new Date (numbers[0]).getSeconds()];
        numbers[0] = bufor1[0] * 60 * 60 + bufor1[1] * 60 + bufor1[2];
        const bufor2 = numbers[1].split(':');
        numbers[1] = parseInt(bufor2[0], 10) * 60 * 60 + parseInt(bufor2[1], 10) * 60 + parseInt(bufor2[2], 10);

        // use offset
        numbers[1] = numbers[1] +  offset * 60;

        // use method
        if (compareMethod === '>='){
          if (numbers[0] >= numbers[1]) return true;
          else return false;
        } else if (compareMethod === '<='){
          if (numbers[0] <= numbers[1]) return true;
          else return false;
        } else return false;
      }*/

        // prepare container
        resetArrays();
        resetSemester();

        // main function
        for (let i = 0; i < presenceQuantity; i++) {
          presenceIdCurrent = presence[i].id_user; // find users from presence id
          whatGender = users.find(findUser).gender; // set his/her gender
          if (
            presence[i].time >= firstDayOfCurrentSemester &&
            presence[i].time <= lastDayOfCurrentSemester
          ) {
            if (
              presence[i].time >= firstDayOfCurrentWeek &&
              presence[i].time <= lastDayOfCurrentWeek
            ) {
              let setWeekDate = false;
              let isFound = false;
              /* for (let j = 0; j < currentGroups.length; j++){ // through all groups
              if (new Date(presence[i].time).getDay()  === currentGroups[j].day){
                // tslint:disable-next-line:max-line-length
                 if (compareTime('>=', -30, [presence[i].time, currentGroups[j].start]) && compareTime('<=', -30, [presence[i].time, currentGroups[j].end])){
                  isFound = true;
                  // count people in defined hours
                  if (whatGender === 1){
                    dataGroups[j].man ++;
                  } else {
                    dataGroups[j].woman ++;
                  }
                 }
              }
            }*/

              for (let j = 0; j < currentGroups.length; j++) {
                // through all groups
                if (presence[i].id_group === currentGroups[j].id) {
                  isFound = true;
                  if (whatGender === 1) {
                    dataGroups[j].man++;
                  } else {
                    dataGroups[j].woman++;
                  }
                }
              }

              // count people in undefined hours
              if (isFound === false) {
                if (whatGender === 1) {
                  dataGroups[currentGroups.length].man++;
                } else {
                  dataGroups[currentGroups.length].woman++;
                }
              }

              // set date once
              if (setWeekDate === false) {
                dataDays[0].date = new Date(
                  firstDayOfCurrentWeek.valueOf() + 6 * 24 * 60 * 60 * 1000,
                ).toLocaleDateString();
                for (let k = 1; k < 7; k++) {
                  dataDays[k].date = new Date(
                    firstDayOfCurrentWeek.valueOf() +
                      (k - 1) * 24 * 60 * 60 * 1000,
                  ).toLocaleDateString();
                }
                for (let k = 0; k < currentGroups.length; k++) {
                  // tslint:disable-next-line:max-line-length
                  dataGroups[k].date = new Date(
                    firstDayOfCurrentWeek.valueOf() +
                      (currentGroups[k].day - 1) * 24 * 60 * 60 * 1000,
                  ).toLocaleDateString();
                }
                setWeekDate = true;
              }

              // counts people in days
              if (whatGender === 1) {
                dataDays[presence[i].time.getDay()].man++;
              } else {
                dataDays[presence[i].time.getDay()].woman++;
              }
            } else if (presence[i].time < firstDayOfCurrentWeek) {
              // push week
              type.week =
                firstDayOfCurrentWeek.toLocaleDateString() +
                ' - ' +
                lastDayOfCurrentWeek.toLocaleDateString();
              type.groups = dataGroups;
              type.days = dataDays;
              semester.data.push(type);

              // reset array
              resetArrays();

              // change week
              firstDayOfCurrentWeek = new Date(
                firstDayOfCurrentWeek.valueOf() - 7 * 24 * 60 * 60 * 1000,
              );
              lastDayOfCurrentWeek = new Date(
                lastDayOfCurrentWeek.valueOf() - 7 * 24 * 60 * 60 * 1000,
              );

              i--; // repeat for this presence log
            }
          } else if (presence[i].time < firstDayOfCurrentSemester) {
            if (currentSemesterArrayPosition + 1 < semestersQuantity) {
              // push last data
              type.week =
                firstDayOfCurrentWeek.toLocaleDateString() +
                ' - ' +
                lastDayOfCurrentWeek.toLocaleDateString();
              type.groups = dataGroups;
              type.days = dataDays;
              semester.data.push(type);
              semester.data.reverse();
              data.data.push(semester); // push semester to data

              // change semester
              currentSemesterArrayPosition++;
              firstDayOfCurrentSemester = new Date(
                semesters[currentSemesterArrayPosition].start,
              );
              lastDayOfCurrentSemester = new Date(
                semesters[currentSemesterArrayPosition].end,
              );
              // tslint:disable-next-line:max-line-length
              firstDayOfCurrentWeek =
                lastDayOfCurrentSemester.getDay() === 0
                  ? new Date(
                      lastDayOfCurrentSemester.setHours(0, 0, 0, 0) -
                        6 * 1000 * 60 * 60 * 24,
                    )
                  : new Date(
                      lastDayOfCurrentSemester.setHours(0, 0, 0, 0) -
                        (lastDayOfCurrentSemester.getDay() - 1) *
                          1000 *
                          60 *
                          60 *
                          24,
                    );
              lastDayOfCurrentWeek = new Date(
                firstDayOfCurrentWeek.valueOf() + 7 * 24 * 60 * 60 * 1000 - 1,
              );
              currentSemesterId =
                semesters[currentSemesterArrayPosition].id_semester;
              currentSemesterName =
                semesters[currentSemesterArrayPosition].name;
              currentGroups = group.filter(findGroupsById);

              // reset arrays
              resetSemester();
              resetArrays();

              i--; // repeat for this presence log
            } else {
              break;
            }
          }
        }
        //// after last presence log

        // push last week and semester
        type.week =
          firstDayOfCurrentWeek.toLocaleDateString() +
          ' - ' +
          lastDayOfCurrentWeek.toLocaleDateString();
        type.groups = dataGroups;
        type.days = dataDays;
        semester.data.push(type);
        semester.data.reverse();
        data.data.push(semester);

        // return data
        return data;
      }

      function weekToWeek() {
        // tslint:disable-next-line:no-shadowed-variable
        const now = new Date();
        let whatGender;
        // tslint:disable-next-line:max-line-length
        let firstDayOfCurrentWeek =
          now.getDay() === 0
            ? new Date(now.setHours(0, 0, 0, 0) - 6 * 1000 * 60 * 60 * 24)
            : new Date(
                now.setHours(0, 0, 0, 0) -
                  (now.getDay() - 1) * 1000 * 60 * 60 * 24,
              );
        // tslint:disable-next-line:max-line-length
        let lastDayOfCurrentWeek =
          now.getDay() === 0
            ? new Date(now.setHours(23, 59, 59, 999))
            : new Date(
                now.setHours(23, 59, 59, 999) +
                  (7 - now.getDay()) * 1000 * 60 * 60 * 24,
              );
        let week;
        const data = {
          name: 'weekToWeek',
          data: [],
        };

        function setWeek() {
          week = {
            week: '',
            man: 0,
            woman: 0,
          };
        }
        setWeek();
        for (let i = 0; i < presenceQuantity; i++) {
          presenceIdCurrent = presence[i].id_user;
          whatGender = users.find(findUser).gender;
          if (
            presence[i].time >= firstDayOfCurrentWeek &&
            presence[i].time <= lastDayOfCurrentWeek
          ) {
            if (whatGender === 1) {
              week.man++;
            } else {
              week.woman++;
            }
          } else if (presence[i].time < firstDayOfCurrentWeek) {
            week.week =
              firstDayOfCurrentWeek.toLocaleDateString() +
              ' - ' +
              lastDayOfCurrentWeek.toLocaleDateString();
            data.data.push(week);
            setWeek();
            firstDayOfCurrentWeek = new Date(
              firstDayOfCurrentWeek.valueOf() - 7 * 24 * 60 * 60 * 1000,
            );
            lastDayOfCurrentWeek = new Date(
              lastDayOfCurrentWeek.valueOf() - 7 * 24 * 60 * 60 * 1000,
            );
            i--;
          }
        }
        week.week =
          firstDayOfCurrentWeek.toLocaleDateString() +
          ' - ' +
          lastDayOfCurrentWeek.toLocaleDateString();
        data.data.push(week);
        data.data.reverse();
        return data;
      }
      return [
        lastWeek(),
        lastMonth(),
        lastSemestr(),
        allTime(),
        groups(),
        weekToWeek(),
      ];
    });
  }

}
