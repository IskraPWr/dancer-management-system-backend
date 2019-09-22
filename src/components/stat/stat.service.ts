import {
  IPresenceGeneralData,
  IWeekPresenceStat,
  IGenderStat,
  IPresenceDaysData,
  IPresenceGroupsData,
  IPresenceGroupDetails,
} from './../../typings/typings.d';
import { Presence } from './../presence/presence.entity';
import { Group } from './../group/group.entity';
import { Installment } from './../instrallmentDate/instrallmentDate.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPresenceStat,
  IPresence,
  IPresenceSemesterData,
  IPresenceStat2,
} from 'src/typings/typings';
import { Users } from '../users/users.entity';
import { days } from 'src/items/iteams';
import moment = require('moment');

@Injectable()
export class StatService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Installment)
    private readonly semestersRepository: Repository<Installment>,
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    @InjectRepository(Presence)
    private readonly presencesRepository: Repository<Presence>,
  ) {}

  getAllPresenceStat(): /*Promise<IPresenceStat2>*/ Promise<any> {
    const semestersPromise = this.semestersRepository.find();
    const groupsPromise = this.groupsRepository.find();
    const presencePromise = this.presencesRepository.find();
    const usersPromise = this.usersRepository.find();

    return Promise.all([
      semestersPromise,
      groupsPromise,
      presencePromise,
      usersPromise,
    ]).then(([semesters, groups, presences, users]) => {
      if (!presences || presences.length === 0) {
        return [];
      }

      presences = presences.sort((current, next) => {
        return current.time > next.time ? -1 : 1;
      });

      //  functions

      //// days
      function getDaysObject(
        withGenderStatObject?: boolean,
        dateToInsert?: Date,
      ): IWeekPresenceStat {
        const daysObject: IWeekPresenceStat = {
          mon: {},
          tue: {},
          wed: {},
          thu: {},
          fri: {},
          sat: {},
          sun: {},
        } as IWeekPresenceStat;

        if (withGenderStatObject && dateToInsert) {
          const daysObjectWithGenderObject: IWeekPresenceStat = daysObject;

          Object.keys(daysObjectWithGenderObject).forEach(
            (dayName: string, index: number) => {
              const currentData = moment(dateToInsert).add(index, 'day');
              const currentDataString: string = currentData.format(
                'DD.MM.YYYY',
              );
              const dayNumber: number = new Date(currentData.toDate()).getDay();

              const dayKeyName = days.find(day => {
                return day.value === dayNumber;
              }).nameKey;
              daysObjectWithGenderObject[dayKeyName] = getGenderStatObject(
                currentDataString,
              );
            },
          );

          return daysObjectWithGenderObject;
        } else if (withGenderStatObject) {
          const daysObjectWithGenderObject: IWeekPresenceStat = daysObject;

          Object.keys(daysObjectWithGenderObject).forEach((dayName: string) => {
            daysObjectWithGenderObject[dayName] = getGenderStatObject(null);
          });

          return daysObjectWithGenderObject;
        }
        return daysObject;
      }

      // week to week data
      function getWeekToWeekObject(): IGenderStat[] {
        const pack: IGenderStat[] = [];

        let firstDayOfWeek: Date = moment(presences[presences.length - 1].time)
          .startOf('week')
          .add(1, 'day')
          .toDate();
        let lastDayOfWeek: Date = moment(presences[presences.length - 1].time)
          .endOf('week')
          .add(1, 'day')
          .toDate();

        while (
          firstDayOfWeek <= moment(presences[0].time).toDate() &&
          firstDayOfWeek <= new Date()
        ) {
          pack.push({
            week: `${firstDayOfWeek.getDate()} - ${moment(lastDayOfWeek).format(
              'DD.MM.YYYY',
            )}`,
            man: 0,
            woman: 0,
          });

          firstDayOfWeek = moment(firstDayOfWeek)
            .add(7, 'day')
            .toDate();
          lastDayOfWeek = moment(lastDayOfWeek)
            .add(7, 'day')
            .toDate();
        }

        pack.push({
          man: 0,
          woman: 0,
          week: `${firstDayOfWeek.getDate()} - ${moment(lastDayOfWeek).format(
            'DD.MM.YYYY',
          )}`,
        });

        return pack;
      }

      //// gender
      function getGenderStatObject(
        currentData: string | null,
        currentWeek?: string,
      ): IGenderStat {
        const dataToSend: IGenderStat = {
          man: 0,
          woman: 0,
        };

        currentData ? (dataToSend.date = currentData) : null;

        return dataToSend;
      }

      /// gender in  group
      function getGenderGroupObject(
        group: Group,
        semester: Installment,
      ): IPresenceGroupDetails[] {
        const dataToSend: IPresenceGroupDetails[] = [];

        let firstDayOfWeek: Date = moment(semester.start)
          .startOf('week')
          .add(1, 'day')
          .toDate();
        let lastDayOfWeek: Date = moment(semester.start)
          .endOf('week')
          .add(1, 'day')
          .toDate();
        let dayOfClasses: Date = moment(semester.start)
          .day(group.day)
          .toDate();

        if (dayOfClasses < semester.start) {
          dayOfClasses = moment(dayOfClasses)
            .add(7, 'day')
            .toDate();
          if (dayOfClasses > lastDayOfWeek) {
            firstDayOfWeek = moment(firstDayOfWeek)
              .add(7, 'day')
              .toDate();
            lastDayOfWeek = moment(lastDayOfWeek)
              .add(7, 'day')
              .toDate();
          }
        }

        while (firstDayOfWeek <= semester.end && firstDayOfWeek <= new Date()) {
          dataToSend.push({
            week: `${firstDayOfWeek.getDate()} - ${moment(lastDayOfWeek).format(
              'DD.MM.YYYY',
            )}`,
            day: moment(dayOfClasses)
              .format('DD.MM.YYYY')
              .toString(),
            man: 0,
            woman: 0,
          });
          firstDayOfWeek = moment(firstDayOfWeek)
            .add(7, 'day')
            .toDate();
          lastDayOfWeek = moment(lastDayOfWeek)
            .add(7, 'day')
            .toDate();
          dayOfClasses = moment(dayOfClasses)
            .add(7, 'day')
            .toDate();
        }

        return dataToSend;
      }

      //// group
      function getGroupsObjects(semester: Installment): IPresenceGroupsData[] {
        const groupsPack: IPresenceGroupsData[] = [];

        const filteredGroups: Group[] = groups.filter((group: Group) => {
          return group.id_semester === semester.id_semester;
        });

        filteredGroups.forEach((group: Group) => {
          groupsPack.push({
            name: group.name,
            groupData: getGenderGroupObject(group, semester),
          } as IPresenceGroupsData);
        });

        return groupsPack;
      }

      //// week
      function getWeeksObjects(semester: Installment): IPresenceDaysData[] {
        const weeksPack: IPresenceDaysData[] = [];

        let firstDayOfWeek: Date = moment(semester.start)
          .startOf('week')
          .add(1, 'day')
          .toDate();
        let lastDayOfWeek: Date = moment(semester.start)
          .endOf('week')
          .add(1, 'day')
          .toDate();

        if (firstDayOfWeek < semester.start) {
          firstDayOfWeek = moment(firstDayOfWeek)
            .add(7, 'day')
            .toDate();
          lastDayOfWeek = moment(lastDayOfWeek)
            .add(7, 'day')
            .toDate();
        }

        while (firstDayOfWeek <= semester.end && firstDayOfWeek <= new Date()) {
          weeksPack.push({
            week: `${firstDayOfWeek.getDate()} - ${moment(lastDayOfWeek).format(
              'DD.MM.YYYY',
            )}`,
            days: getDaysObject(true, firstDayOfWeek),
          });
          firstDayOfWeek = moment(firstDayOfWeek)
            .add(7, 'day')
            .toDate();
          lastDayOfWeek = moment(lastDayOfWeek)
            .add(7, 'day')
            .toDate();
        }

        return weeksPack;
      }

      // sorted data

      const sortedSemesters = semesters.sort(
        (firstSemester, secondSemester) => {
          return firstSemester.end > secondSemester.end ? -1 : 1;
        },
      );

      // general
      const startDateOfLastWeek = new Date(
        new Date().setDate(new Date().getDate() - 7),
      );

      const startDateOfThisMonth = () => {
        const beginningOfThistMonthValue: number = new Date().setDate(1);
        return new Date(beginningOfThistMonthValue);
      };

      const startDateOfLastSemester: Date | null = sortedSemesters
        ? sortedSemesters[0].start
        : null;
      const endDateOfLastSemester: Date | null = sortedSemesters
        ? sortedSemesters[0].end
        : null;

      // DATA

      // general data
      const generalDataPack: IPresenceGeneralData = {
        week: getDaysObject(true),
        month: getDaysObject(true),
        semester: getDaysObject(true),
        all: getDaysObject(true),
      };

      // days data
      const daysDataPack: IPresenceSemesterData[] = sortedSemesters.map(
        (semester: Installment) => {
          return {
            name: semester.name,
            id_semester: semester.id_semester,
            data: getWeeksObjects(semester),
          } as IPresenceSemesterData;
        },
      );

      // days data
      const groupsDataPack: IPresenceSemesterData[] = sortedSemesters.map(
        (semester: Installment) => {
          return {
            name: semester.name,
            id_semester: semester.id_semester,
            data: getGroupsObjects(semester),
          } as IPresenceSemesterData;
        },
      );

      // weekToWeek data
      const weekToWeekDataPack: IGenderStat[] = getWeekToWeekObject();

      // MAIN LOOP
      presences.forEach((presence: Presence) => {
        const user = users.find((thisUser: Users) => {
          return thisUser.id_user === presence.id_user;
        });
        const dayOfWeek: number = presence.time.getDay();
        const keyNameOfTheDay: string = days.find(day => {
          return day.value === dayOfWeek;
        }).nameKey;

        // general in loop
        user.gender === 1
          ? (generalDataPack.all[keyNameOfTheDay] as IGenderStat).man++
          : (generalDataPack.all[keyNameOfTheDay] as IGenderStat).woman++;

        if (presence.time >= startDateOfLastWeek) {
          user.gender === 1
            ? (generalDataPack.week[keyNameOfTheDay] as IGenderStat).man++
            : (generalDataPack.week[keyNameOfTheDay] as IGenderStat).woman++;
        }

        if (presence.time >= startDateOfThisMonth()) {
          user.gender === 1
            ? (generalDataPack.month[keyNameOfTheDay] as IGenderStat).man++
            : (generalDataPack.month[keyNameOfTheDay] as IGenderStat).woman++;
        }

        if (
          presence.time >= startDateOfLastSemester &&
          presence.time <= endDateOfLastSemester
        ) {
          user.gender === 1
            ? (generalDataPack.semester[keyNameOfTheDay] as IGenderStat).man++
            : (generalDataPack.semester[keyNameOfTheDay] as IGenderStat)
                .woman++;
        }

        // days & group in loop
        const semestersToObtainData = sortedSemesters.filter(
          (semester: Installment) => {
            return (
              presence.time >= semester.start && presence.time < semester.end
            );
          },
        );

        // days
        semestersToObtainData.forEach((semester: Installment) => {
          const semesterInDataPack: IPresenceSemesterData = daysDataPack.find(
            (semesterData: IPresenceSemesterData) => {
              return semester.id_semester === semesterData.id_semester;
            },
          );

          const firstDayOfWeek: Date = moment(presence.time)
            .startOf('week')
            .add(1, 'day')
            .toDate();
          const lastDayOfWeek: Date = moment(presence.time)
            .endOf('week')
            .add(1, 'day')
            .toDate();

          const weekInDataPack: IPresenceDaysData = (semesterInDataPack.data as IPresenceDaysData[]).find(
            (week: IPresenceDaysData) => {
              return (
                week.week ===
                `${firstDayOfWeek.getDate()} - ${moment(lastDayOfWeek).format(
                  'DD.MM.YYYY',
                )}`
              );
            },
          );

          if (user.gender === 1) {
            (weekInDataPack.days[keyNameOfTheDay] as IGenderStat).man++;
          } else {
            (weekInDataPack.days[keyNameOfTheDay] as IGenderStat).woman++;
          }
        });

        // group
        semestersToObtainData.forEach((semester: Installment) => {
          const semesterInGroupOutputData: IPresenceSemesterData = groupsDataPack.find(
            (semesterData: IPresenceSemesterData) => {
              return semester.id_semester === semesterData.id_semester;
            },
          );

          if (semesterInGroupOutputData.data.length !== 0) {
            const groupInDataPack: IPresenceGroupsData = (semesterInGroupOutputData.data as IPresenceGroupsData[]).find(
              (group: IPresenceGroupsData) => {
                return (
                  group.name ===
                  groups.find((eachGroup: Group) => {
                    return eachGroup.id === presence.id_group;
                  }).name
                );
              },
            );

            const dayOfClasses: IPresenceGroupDetails = groupInDataPack.groupData.find(
              (day: IPresenceGroupDetails) => {
                return day.day === moment(presence.time).format('DD.MM.YYYY');
              },
            );

            if (user.gender === 1) {
              dayOfClasses.man++;
            } else {
              dayOfClasses.woman++;
            }
          }
        });

        // weekToWeek

        const firstDayOfWeek2: Date = moment(presence.time)
          .startOf('week')
          .add(1, 'day')
          .toDate();
        const lastDayOfWeek2: Date = moment(presence.time)
          .endOf('week')
          .add(1, 'day')
          .toDate();

        const weekendInWhichChangeData = weekToWeekDataPack.find(
          (week: IGenderStat) => {
            return (
              week.week ===
              `${firstDayOfWeek2.getDate()} - ${moment(lastDayOfWeek2).format(
                'DD.MM.YYYY',
              )}`
            );
          },
        );

        if (user.gender === 1) {
          weekendInWhichChangeData.man++;
        } else {
          weekendInWhichChangeData.woman++;
        }
      });

      return {
        general: generalDataPack,
        days: daysDataPack,
        groups: groupsDataPack,
        weekToWeek: weekToWeekDataPack,
      };
    });
  }

  getPresenceStat(id: number): Promise<IPresenceStat | any[]> {
    const semestersPromise = this.semestersRepository.find();
    const groupsPromise = this.groupsRepository.find();
    const presencePromise = this.presencesRepository.find();
    const userPromise = this.usersRepository.findOne({
      id_user: id,
    });

    return Promise.all([
      semestersPromise,
      groupsPromise,
      presencePromise,
      userPromise,
    ]).then(([semesters, groups, presences, user]) => {
      if (!user) {
        return [];
      }

      function countTheNumberOfPeopleInIndividualGroups(
        start: Date,
        end: Date = new Date(),
      ): IPresence[] {
        const userPresenceInGivenRange: Presence[] = presences.filter(
          (presence: Presence) => {
            return (
              new Date(presence.time) > new Date(start) &&
              new Date(presence.time) <= new Date(end) &&
              presence.id_user === user.id_user
            );
          },
        );

        const givenRangeGroupData: IPresence[] = [];
        userPresenceInGivenRange.forEach((presence: Presence) => {
          const currentGroupName = groups.find((groupData: Group) => {
            return groupData.id === presence.id_group;
          }).name;

          const currentGroup = givenRangeGroupData.find((group: IPresence) => {
            return group.name === currentGroupName;
          });

          if (currentGroup) {
            currentGroup.data++;
          } else {
            givenRangeGroupData.push({
              name: currentGroupName,
              data: 1,
            });
          }
        });

        return givenRangeGroupData;
      }

      // last month
      const dateOneMonthAgo = new Date(
        new Date().setMonth(new Date().getMonth() - 1),
      );
      const lastMonthData: IPresence[] = countTheNumberOfPeopleInIndividualGroups(
        dateOneMonthAgo,
      );

      // all

      const sortedSemesters: Installment[] = semesters.sort(
        (firstSemester, secondSemester) => {
          return firstSemester.end > secondSemester.end ? 1 : -1;
        },
      );

      const allSemestersGroupsData: IPresenceSemesterData[] = [];
      sortedSemesters.forEach((semester: Installment) => {
        allSemestersGroupsData.push({
          name: semester.name,
          id_semester: semester.id_semester,
          data: countTheNumberOfPeopleInIndividualGroups(
            semester.start,
            semester.end,
          ),
        });
      });

      // days

      const allVisitsData: IPresence[] = [];
      for (let i = 0; i < 7; i++) {
        const day = days.find(day => {
          return day.value === i;
        });

        allVisitsData.push({
          name: day.name,
          data: 0,
        });
      }

      presences.forEach((presence: Presence) => {
        if (presence.id_user === user.id_user) {
          const getDayNumber: number = new Date(presence.time).getDay();
          allVisitsData[getDayNumber].data++;
        }
      });

      allVisitsData.push(allVisitsData.shift());

      const dataToSend: IPresenceStat = {
        lastMonth: lastMonthData,
        allSemestersGroups: allSemestersGroupsData,
        allVisits: allVisitsData,
      };

      return dataToSend;
    });
  }
}
