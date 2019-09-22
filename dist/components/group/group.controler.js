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
const notes_service_1 = require("./../notes/notes.service");
const instrallmentDate_service_1 = require("./../instrallmentDate/instrallmentDate.service");
const group_service_1 = require("./group.service");
const common_1 = require("@nestjs/common");
const presence_service_1 = require("../presence/presence.service");
let GroupController = class GroupController {
    constructor(group, semesters, notes, presence) {
        this.group = group;
        this.semesters = semesters;
        this.notes = notes;
        this.presence = presence;
    }
    findAll() {
        return Promise.all([
            this.group.findAll(),
            this.semesters.findAll()
        ])
            .then(([groups, semeters]) => {
            const semestersQuantity = Object.keys(semeters).length;
            const groupsQuantity = Object.keys(groups).length;
            let idSemester;
            let name;
            const data = [];
            let semesterData = [];
            function setSemester() {
                const semester = {
                    id_semester: idSemester,
                    name: name,
                    groups: semesterData,
                };
                data.push(semester);
            }
            for (let i = 0; i < semestersQuantity; i++) {
                idSemester = semeters[i].id_semester;
                name = semeters[i].name;
                for (let j = 0; j < groupsQuantity; j++) {
                    if (groups[j].id_semester === idSemester) {
                        const obj = {
                            id: groups[j].id,
                            name: groups[j].name,
                            day: groups[j].day,
                            start: groups[j].start.slice(0, -3),
                            end: groups[j].end.slice(0, -3),
                        };
                        semesterData.push(obj);
                    }
                }
                setSemester();
                semesterData = [];
            }
            return data;
        });
    }
    findOne(id) {
        return this.group.findAllHeadersBySemesterId(id);
    }
    findUsers(id) {
        return Promise.all([
            this.group.findAllUsersByIdGroup(id),
            this.notes.findAll(),
            this.presence.findAllPresenceInGroupByIdGroup(id),
            this.semesters.findSemesterByIdGroup(id),
            this.group.findGroupById(id),
        ]).then(value => {
            const data = [];
            const usersQuantity = Object.keys(value[0]).length;
            const notesQuantity = Object.keys(value[1]).length;
            const presenceQuantity = Object.keys(value[2]).length;
            let lastNoteId = 0;
            let lastPresenceId = 0;
            const containerWithDates = [];
            let currentDay = value[3][0]['start'];
            const namesOfMonths = [
                'Stycznień',
                'Luty',
                'Marzec',
                'Kwiecień',
                'Maj',
                'Czerwiec',
                'Lipiec',
                'Sierpień',
                'Wrzesień',
                'Październik',
                'Listopad',
                'Grudzień'
            ];
            while (currentDay.getDay() !== value[4][0]['day']) {
                currentDay = new Date(currentDay.valueOf() + 1000 * 60 * 60 * 24);
            }
            while (currentDay < value[3][0]['end']) {
                containerWithDates.push(currentDay);
                currentDay = new Date(currentDay.valueOf() + 1000 * 60 * 60 * 24 * 7);
            }
            for (let i = 0; i < usersQuantity; i++) {
                const obj = {
                    id: value[0][i]['id_user'],
                    name: value[0][i].name,
                    surname: value[0][i]['surname'],
                    gender: value[0][i]['gender'],
                    notes: [],
                    presences: [],
                };
                for (let j = lastNoteId; j < notesQuantity; j++) {
                    if (value[0][i]['id_user'] === value[1][j].id_user) {
                        obj.notes.push({ name: value[1][j].note });
                    }
                    else if (value[0][i]['id_user'] < value[1][j].id_user) {
                        lastNoteId = j;
                        break;
                    }
                }
                const objPresence = [];
                for (let m = 0; m < containerWithDates.length; m++) {
                    objPresence.push({
                        date: containerWithDates[m].getDate() + ' ' + namesOfMonths[containerWithDates[m].getMonth()],
                        value: null,
                    });
                }
                for (let j = lastPresenceId; j < presenceQuantity; j++) {
                    if (value[0][i]['id_user'] === value[2][j].id_user) {
                        for (let k = 0; k < objPresence.length; k++) {
                            if (value[2][j].time.getDate() === containerWithDates[k].getDate()) {
                                objPresence[k].value = '|';
                                break;
                            }
                        }
                    }
                }
                obj.presences = objPresence;
                data.push(obj);
            }
            return data;
        });
    }
    removeDate(message) {
        return this.group.removeDate(message);
    }
    changeDate(message) {
        return this.group.changeDate(message);
    }
    addDate(message) {
        return this.group.addDate(message);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "findOne", null);
__decorate([
    common_1.Get('findbyidgroup/:id'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "findUsers", null);
__decorate([
    common_1.Post('remove'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "removeDate", null);
__decorate([
    common_1.Post('change'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "changeDate", null);
__decorate([
    common_1.Post('add'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "addDate", null);
GroupController = __decorate([
    common_1.Controller('groups'),
    __metadata("design:paramtypes", [group_service_1.GroupService, instrallmentDate_service_1.InstallmentDateService, notes_service_1.NotesService, presence_service_1.PresenceService])
], GroupController);
exports.GroupController = GroupController;
//# sourceMappingURL=group.controler.js.map