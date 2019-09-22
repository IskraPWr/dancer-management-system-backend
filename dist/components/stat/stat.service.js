"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const presence_entity_1 = require("./../presence/presence.entity");
const group_entity_1 = require("./../group/group.entity");
const instrallmentDate_entity_1 = require("./../instrallmentDate/instrallmentDate.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const iteams_1 = require("src/items/iteams");
const moment = require("moment");
let StatService = class StatService {
    constructor(usersRepository, semestersRepository, groupsRepository, presencesRepository) {
        this.usersRepository = usersRepository;
        this.semestersRepository = semestersRepository;
        this.groupsRepository = groupsRepository;
        this.presencesRepository = presencesRepository;
    }
    getAllPresenceStat() {
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
            function getDaysObject(withGenderStatObject, dateToInsert) {
                const daysObject = {
                    mon: {},
                    tue: {},
                    wed: {},
                    thu: {},
                    fri: {},
                    sat: {},
                    sun: {},
                };
                if (withGenderStatObject && dateToInsert) {
                    const daysObjectWithGenderObject = daysObject;
                    Object.keys(daysObjectWithGenderObject).forEach((dayName, index) => {
                        const currentData = moment(dateToInsert).add(index, 'day');
                        const currentDataString = currentData.format('DD.MM.YYYY');
                        const dayNumber = new Date(currentData.toDate()).getDay();
                        const dayKeyName = iteams_1.days.find(day => {
                            return day.value === dayNumber;
                        }).nameKey;
                        daysObjectWithGenderObject[dayKeyName] = getGenderStatObject(currentDataString);
                    });
                    return daysObjectWithGenderObject;
                }
                else if (withGenderStatObject) {
                    const daysObjectWithGenderObject = daysObject;
                    Object.keys(daysObjectWithGenderObject).forEach((dayName) => {
                        daysObjectWithGenderObject[dayName] = getGenderStatObject(null);
                    });
                    return daysObjectWithGenderObject;
                }
                return daysObject;
            }
            function getWeekToWeekObject() {
                const pack = [];
                let firstDayOfWeek = moment(presences[presences.length - 1].time)
                    .startOf('week')
                    .add(1, 'day')
                    .toDate();
                let lastDayOfWeek = moment(presences[presences.length - 1].time)
                    .endOf('week')
                    .add(1, 'day')
                    .toDate();
                while (firstDayOfWeek <= moment(presences[0].time).toDate() &&
                    firstDayOfWeek <= new Date()) {
                    pack.push({
                        week: `${firstDayOfWeek.getDate()} - ${moment(lastDayOfWeek).format('DD.MM.YYYY')}`,
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
                    week: `${firstDayOfWeek.getDate()} - ${moment(lastDayOfWeek).format('DD.MM.YYYY')}`,
                });
                return pack;
            }
            function getGenderStatObject(currentData, currentWeek) {
                const dataToSend = {
                    man: 0,
                    woman: 0,
                };
                currentData ? (dataToSend.date = currentData) : null;
                return dataToSend;
            }
            function getGenderGroupObject(group, semester) {
                const dataToSend = [];
                let firstDayOfWeek = moment(semester.start)
                    .startOf('week')
                    .add(1, 'day')
                    .toDate();
                let lastDayOfWeek = moment(semester.start)
                    .endOf('week')
                    .add(1, 'day')
                    .toDate();
                let dayOfClasses = moment(semester.start)
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
                        week: `${firstDayOfWeek.getDate()} - ${moment(lastDayOfWeek).format('DD.MM.YYYY')}`,
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
            function getGroupsObjects(semester) {
                const groupsPack = [];
                const filteredGroups = groups.filter((group) => {
                    return group.id_semester === semester.id_semester;
                });
                filteredGroups.forEach((group) => {
                    groupsPack.push({
                        name: group.name,
                        groupData: getGenderGroupObject(group, semester),
                    });
                });
                return groupsPack;
            }
            function getWeeksObjects(semester) {
                const weeksPack = [];
                let firstDayOfWeek = moment(semester.start)
                    .startOf('week')
                    .add(1, 'day')
                    .toDate();
                let lastDayOfWeek = moment(semester.start)
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
                        week: `${firstDayOfWeek.getDate()} - ${moment(lastDayOfWeek).format('DD.MM.YYYY')}`,
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
            const sortedSemesters = semesters.sort((firstSemester, secondSemester) => {
                return firstSemester.end > secondSemester.end ? -1 : 1;
            });
            const startDateOfLastWeek = new Date(new Date().setDate(new Date().getDate() - 7));
            const startDateOfThisMonth = () => {
                const beginningOfThistMonthValue = new Date().setDate(1);
                return new Date(beginningOfThistMonthValue);
            };
            const startDateOfLastSemester = sortedSemesters
                ? sortedSemesters[0].start
                : null;
            const endDateOfLastSemester = sortedSemesters
                ? sortedSemesters[0].end
                : null;
            const generalDataPack = {
                week: getDaysObject(true),
                month: getDaysObject(true),
                semester: getDaysObject(true),
                all: getDaysObject(true),
            };
            const daysDataPack = sortedSemesters.map((semester) => {
                return {
                    name: semester.name,
                    id_semester: semester.id_semester,
                    data: getWeeksObjects(semester),
                };
            });
            const groupsDataPack = sortedSemesters.map((semester) => {
                return {
                    name: semester.name,
                    id_semester: semester.id_semester,
                    data: getGroupsObjects(semester),
                };
            });
            const weekToWeekDataPack = getWeekToWeekObject();
            presences.forEach((presence) => {
                const user = users.find((thisUser) => {
                    return thisUser.id_user === presence.id_user;
                });
                const dayOfWeek = presence.time.getDay();
                const keyNameOfTheDay = iteams_1.days.find(day => {
                    return day.value === dayOfWeek;
                }).nameKey;
                user.gender === 1
                    ? generalDataPack.all[keyNameOfTheDay].man++
                    : generalDataPack.all[keyNameOfTheDay].woman++;
                if (presence.time >= startDateOfLastWeek) {
                    user.gender === 1
                        ? generalDataPack.week[keyNameOfTheDay].man++
                        : generalDataPack.week[keyNameOfTheDay].woman++;
                }
                if (presence.time >= startDateOfThisMonth()) {
                    user.gender === 1
                        ? generalDataPack.month[keyNameOfTheDay].man++
                        : generalDataPack.month[keyNameOfTheDay].woman++;
                }
                if (presence.time >= startDateOfLastSemester &&
                    presence.time <= endDateOfLastSemester) {
                    user.gender === 1
                        ? generalDataPack.semester[keyNameOfTheDay].man++
                        : generalDataPack.semester[keyNameOfTheDay]
                            .woman++;
                }
                const semestersToObtainData = sortedSemesters.filter((semester) => {
                    return (presence.time >= semester.start && presence.time < semester.end);
                });
                semestersToObtainData.forEach((semester) => {
                    const semesterInDataPack = daysDataPack.find((semesterData) => {
                        return semester.id_semester === semesterData.id_semester;
                    });
                    const firstDayOfWeek = moment(presence.time)
                        .startOf('week')
                        .add(1, 'day')
                        .toDate();
                    const lastDayOfWeek = moment(presence.time)
                        .endOf('week')
                        .add(1, 'day')
                        .toDate();
                    const weekInDataPack = semesterInDataPack.data.find((week) => {
                        return (week.week ===
                            `${firstDayOfWeek.getDate()} - ${moment(lastDayOfWeek).format('DD.MM.YYYY')}`);
                    });
                    if (user.gender === 1) {
                        weekInDataPack.days[keyNameOfTheDay].man++;
                    }
                    else {
                        weekInDataPack.days[keyNameOfTheDay].woman++;
                    }
                });
                semestersToObtainData.forEach((semester) => {
                    const semesterInGroupOutputData = groupsDataPack.find((semesterData) => {
                        return semester.id_semester === semesterData.id_semester;
                    });
                    if (semesterInGroupOutputData.data.length !== 0) {
                        const groupInDataPack = semesterInGroupOutputData.data.find((group) => {
                            return (group.name ===
                                groups.find((eachGroup) => {
                                    return eachGroup.id === presence.id_group;
                                }).name);
                        });
                        const dayOfClasses = groupInDataPack.groupData.find((day) => {
                            return day.day === moment(presence.time).format('DD.MM.YYYY');
                        });
                        if (user.gender === 1) {
                            dayOfClasses.man++;
                        }
                        else {
                            dayOfClasses.woman++;
                        }
                    }
                });
                const firstDayOfWeek2 = moment(presence.time)
                    .startOf('week')
                    .add(1, 'day')
                    .toDate();
                const lastDayOfWeek2 = moment(presence.time)
                    .endOf('week')
                    .add(1, 'day')
                    .toDate();
                const weekendInWhichChangeData = weekToWeekDataPack.find((week) => {
                    return (week.week ===
                        `${firstDayOfWeek2.getDate()} - ${moment(lastDayOfWeek2).format('DD.MM.YYYY')}`);
                });
                if (user.gender === 1) {
                    weekendInWhichChangeData.man++;
                }
                else {
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
    getPresenceStat(id) {
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
            function countTheNumberOfPeopleInIndividualGroups(start, end = new Date()) {
                const userPresenceInGivenRange = presences.filter((presence) => {
                    return (new Date(presence.time) > new Date(start) &&
                        new Date(presence.time) <= new Date(end) &&
                        presence.id_user === user.id_user);
                });
                const givenRangeGroupData = [];
                userPresenceInGivenRange.forEach((presence) => {
                    const currentGroupName = groups.find((groupData) => {
                        return groupData.id === presence.id_group;
                    }).name;
                    const currentGroup = givenRangeGroupData.find((group) => {
                        return group.name === currentGroupName;
                    });
                    if (currentGroup) {
                        currentGroup.data++;
                    }
                    else {
                        givenRangeGroupData.push({
                            name: currentGroupName,
                            data: 1,
                        });
                    }
                });
                return givenRangeGroupData;
            }
            const dateOneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));
            const lastMonthData = countTheNumberOfPeopleInIndividualGroups(dateOneMonthAgo);
            const sortedSemesters = semesters.sort((firstSemester, secondSemester) => {
                return firstSemester.end > secondSemester.end ? 1 : -1;
            });
            const allSemestersGroupsData = [];
            sortedSemesters.forEach((semester) => {
                allSemestersGroupsData.push({
                    name: semester.name,
                    id_semester: semester.id_semester,
                    data: countTheNumberOfPeopleInIndividualGroups(semester.start, semester.end),
                });
            });
            const allVisitsData = [];
            for (let i = 0; i < 7; i++) {
                const day = iteams_1.days.find(day => {
                    return day.value === i;
                });
                allVisitsData.push({
                    name: day.name,
                    data: 0,
                });
            }
            presences.forEach((presence) => {
                if (presence.id_user === user.id_user) {
                    const getDayNumber = new Date(presence.time).getDay();
                    allVisitsData[getDayNumber].data++;
                }
            });
            allVisitsData.push(allVisitsData.shift());
            const dataToSend = {
                lastMonth: lastMonthData,
                allSemestersGroups: allSemestersGroupsData,
                allVisits: allVisitsData,
            };
            return dataToSend;
        });
    }
};
StatService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(users_entity_1.Users)),
    __param(1, typeorm_1.InjectRepository(instrallmentDate_entity_1.Installment)),
    __param(2, typeorm_1.InjectRepository(group_entity_1.Group)),
    __param(3, typeorm_1.InjectRepository(presence_entity_1.Presence)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StatService);
exports.StatService = StatService;
//# sourceMappingURL=stat.service.js.map