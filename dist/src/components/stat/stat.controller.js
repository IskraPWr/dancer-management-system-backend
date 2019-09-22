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
const instrallmentDate_service_1 = require("./../instrallmentDate/instrallmentDate.service");
const group_service_1 = require("./../group/group.service");
const presence_service_1 = require("./../presence/presence.service");
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const stat_service_1 = require("./stat.service");
let StatisticsUniversityController = class StatisticsUniversityController {
    constructor(user, users, presence, semesters, groups, stat) {
        this.user = user;
        this.users = users;
        this.presence = presence;
        this.semesters = semesters;
        this.groups = groups;
        this.stat = stat;
    }
    findUniversities() {
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
                }
                else {
                    university.name = user.university;
                    university.value++;
                    data.push(university);
                }
            }
            return data;
        });
    }
    findPresenceAll(id) {
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
    findAllGender() {
        return Promise.resolve(this.user.findAllActive()).then(value => {
            let male = 0;
            let female = 0;
            for (const obj of value) {
                obj.gender === 0 ? female++ : male++;
            }
            return [{ gender: 'male', value: male }, { gender: 'female', value: female }];
        });
    }
    findGender() {
        return Promise.resolve(this.user.findAllActive()).then(value => {
            let male = 0;
            let female = 0;
            for (const obj of value) {
                obj.gender === 0 ? female++ : male++;
            }
            return [{ name: 'male', value: male }, { name: 'female', value: female }];
        });
    }
    findCharges() {
        return Promise.resolve(this.user.findAllActive()).then(value => {
            const data = [];
            const array = [0, 0, 0, 0, 0, 0, 0];
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
                for (let i = 0; i < name.length; i++) {
                    if (user.declaration > 0 && user.declaration <= name.length) {
                        array[user.declaration - 1]++;
                        break;
                    }
                }
            }
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
    findGenderInArchives() {
        return Promise.resolve(this.user.findAllInactive()).then(value => {
            let male = 0;
            let female = 0;
            for (const user of value) {
                user.gender === 0 ? female++ : male++;
            }
            return [{ name: 'male', value: male }, { name: 'female', value: female }];
        });
    }
    find(id, id_semester) {
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
    getPresence() {
        return this.stat.getAllPresenceStat();
    }
    findPresence(id) {
        return this.stat.getPresenceStat(id);
    }
};
__decorate([
    common_1.Get('universities'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsUniversityController.prototype, "findUniversities", null);
__decorate([
    common_1.Get('presence/all/:id'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatisticsUniversityController.prototype, "findPresenceAll", null);
__decorate([
    common_1.Get('gender'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsUniversityController.prototype, "findAllGender", null);
__decorate([
    common_1.Get('gender/gender'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsUniversityController.prototype, "findGender", null);
__decorate([
    common_1.Get('charges'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsUniversityController.prototype, "findCharges", null);
__decorate([
    common_1.Get('archives/gender'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsUniversityController.prototype, "findGenderInArchives", null);
__decorate([
    common_1.Get('people/:id/:id_semester'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Param('id')), __param(1, common_1.Param('id_semester')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], StatisticsUniversityController.prototype, "find", null);
__decorate([
    common_1.Get('people'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsUniversityController.prototype, "getPresence", null);
__decorate([
    common_1.Get('presence/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StatisticsUniversityController.prototype, "findPresence", null);
StatisticsUniversityController = __decorate([
    common_1.Controller('statistics'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        users_service_1.UsersService,
        presence_service_1.PresenceService,
        instrallmentDate_service_1.InstallmentDateService,
        group_service_1.GroupService,
        stat_service_1.StatService])
], StatisticsUniversityController);
exports.StatisticsUniversityController = StatisticsUniversityController;
//# sourceMappingURL=stat.controller.js.map