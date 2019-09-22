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
const common_1 = require("@nestjs/common");
const instrallmentDate_service_1 = require("./../instrallmentDate/instrallmentDate.service");
const list_service_1 = require("./../list/list.service");
const notes_service_1 = require("./../notes/notes.service");
const users_service_1 = require("./../users/users.service");
let ChargesController = class ChargesController {
    constructor(users, notes, list, semester) {
        this.users = users;
        this.notes = notes;
        this.list = list;
        this.semester = semester;
    }
    findAll() {
        return Promise.all([
            this.users.findAllActive(),
            this.notes.findAll(),
            this.list.findAll(),
            this.semester.findAll(),
        ]).then(value => {
            const data = [];
            const usersQuantity = Object.keys(value[0]).length;
            const notesQuantity = Object.keys(value[1]).length;
            const listQuantity = Object.keys(value[2]).length;
            const semesterQuantity = Object.keys(value[3]).length;
            let lastNoteId = 0;
            for (let k = 0; k < semesterQuantity; k++) {
                let bufor;
                let currenIterator = 0;
                const seme = {
                    id_semester: value[3][k].id_semester,
                    name: value[3][k].name,
                    data: [],
                };
                for (let i = 0; i < usersQuantity; i++) {
                    const tab = [0, 0, 0, 0];
                    for (let m = currenIterator; m < listQuantity; m++) {
                        if (new Date(value[2][m].date) > value[3][k].start && new Date(value[2][m].date) <= value[3][k].end &&
                            value[0][i].email === value[2][m].email) {
                            if (value[2][m].product.includes('Składka Członkowska  SKTT PWr dla nowych członków')) {
                                tab[0] = tab[0] + value[2][m].sum;
                            }
                            else if (new Date(value[2][m].date) > value[3][k].start && new Date(value[2][m].date) <= value[3][k].date_1) {
                                tab[1] = tab[1] + value[2][m].sum;
                            }
                            else if (new Date(value[2][m].date) > value[3][k].date_1 && new Date(value[2][m].date) <= value[3][k].date_2) {
                                tab[2] = tab[2] + value[2][m].sum;
                            }
                            else if (new Date(value[2][m].date) > value[3][k].date_2 && new Date(value[2][m].date) <= value[3][k].end) {
                                tab[3] = tab[3] + value[2][m].sum;
                            }
                        }
                        else if (new Date(value[2][m].date) < value[3][k].start) {
                            bufor = m;
                        }
                    }
                    const obj = {
                        id: value[0][i].id_user,
                        name: value[0][i].name,
                        surname: value[0][i].surname,
                        declaration: value[0][i].declaration,
                        entryFee: tab[0],
                        payment1: tab[1],
                        payment2: tab[2],
                        payment3: tab[3],
                        sum: (tab[1] + tab[2] + tab[3]),
                        notes: [],
                    };
                    for (let j = lastNoteId; j < notesQuantity; j++) {
                        if (value[0][i].id_user === value[1][j].id_user) {
                            obj.notes.push({ name: value[1][j].note });
                        }
                        else {
                            lastNoteId = j;
                            break;
                        }
                    }
                    seme.data.push(obj);
                }
                lastNoteId = 0;
                currenIterator = bufor;
                data.push(seme);
            }
            return data;
        });
    }
    find(id) {
        let records;
        let user;
        return Promise.resolve(this.users.findOneAll(id)).then(value => {
            user = value;
            return this.list.findByEmail(value.email);
        }).then(value => {
            if (value === null) {
                return null;
            }
            records = value;
            return this.semester.findAll();
        }).then(value => {
            if (value === null) {
                return null;
            }
            const tab = [0, 0, 0, 0];
            for (let i = 0; i < Object.keys(records).length; i++) {
                if (new Date(records[i].date) > value[0].start && new Date(records[i].date) <= value[0].end) {
                    if (records[i].product.includes('Składka Członkowska  SKTT PWr dla nowych członków')) {
                        tab[0] = tab[0] + records[i].sum;
                    }
                    else if (new Date(records[i].date) > value[0].start && new Date(records[i].date) <= value[0].date_1) {
                        tab[1] = tab[1] + records[i].sum;
                    }
                    else if (new Date(records[i].date) > value[0].date_1 && new Date(records[i].date) <= value[0].date_2) {
                        tab[2] = tab[2] + records[i].sum;
                    }
                    else if (new Date(records[i].date) > value[0].date_2 && new Date(records[i].date) <= value[0].end) {
                        tab[3] = tab[3] + records[i].sum;
                    }
                }
            }
            return {
                semester: value[0],
                charges: {
                    entryFee: tab[0],
                    charges_1: tab[1],
                    charges_2: tab[2],
                    charges_3: tab[3],
                    declaration: user.declaration,
                },
                dues: [
                    '1 blok',
                    '2 bloki',
                    '3 bloki',
                    '4 bloki',
                    '5 bloków',
                    '6 bloków',
                    'BO',
                ],
            };
        });
    }
};
__decorate([
    common_1.Get(),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChargesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChargesController.prototype, "find", null);
ChargesController = __decorate([
    common_1.Controller('charges'),
    __metadata("design:paramtypes", [users_service_1.UsersService, notes_service_1.NotesService, list_service_1.ListService, instrallmentDate_service_1.InstallmentDateService])
], ChargesController);
exports.ChargesController = ChargesController;
//# sourceMappingURL=charges.controller.js.map