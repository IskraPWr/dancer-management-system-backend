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
Object.defineProperty(exports, "__esModule", { value: true });
const notes_service_1 = require("./../notes/notes.service");
const instrallmentDate_service_1 = require("./../instrallmentDate/instrallmentDate.service");
const group_service_1 = require("./../group/group.service");
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
let AssignmentspController = class AssignmentspController {
    constructor(group, semesters, users, notes) {
        this.group = group;
        this.semesters = semesters;
        this.users = users;
        this.notes = notes;
    }
    findAllWithAssignments() {
        return Promise.all([
            this.users.findAllActive(),
            this.notes.findAll(),
            this.group.findAllAssignment()
        ]).then(value => {
            const data = [];
            const usersQuantity = Object.keys(value[0]).length;
            const notesQuantity = Object.keys(value[1]).length;
            const assignmentQuantity = Object.keys(value[2]).length;
            let lastNoteId = 0;
            let lastAssigmentId = 0;
            for (let i = 0; i < usersQuantity; i++) {
                const obj = {
                    id: value[0][i].id_user,
                    name: value[0][i].name,
                    surname: value[0][i].surname,
                    gender: value[0][i].gender,
                    email: value[0][i].email,
                    phone: value[0][i].phone,
                    university: value[0][i].university,
                    department: value[0][i].department,
                    year: value[0][i].year,
                    index: value[0][i].index,
                    notes: [],
                    assignments: [],
                };
                for (let j = lastNoteId; j < notesQuantity; j++) {
                    if (value[0][i].id_user === value[1][j].id_user) {
                        obj.notes.push({ name: value[1][j].note });
                    }
                    if (value[0][i].id_user < value[1][j].id_user) {
                        lastNoteId = j;
                        break;
                    }
                }
                for (let k = lastAssigmentId; k < assignmentQuantity; k++) {
                    if (value[0][i].id_user === value[2][k]['id_user']) {
                        const object = value[2][k];
                        delete object.id;
                        obj.assignments.push(object);
                    }
                    if (value[0][i].id_user < value[2][k]['id_user']) {
                        lastAssigmentId = k;
                        break;
                    }
                }
                data.push(obj);
            }
            return data;
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
], AssignmentspController.prototype, "findAllWithAssignments", null);
AssignmentspController = __decorate([
    common_1.Controller('assignments'),
    __metadata("design:paramtypes", [group_service_1.GroupService, instrallmentDate_service_1.InstallmentDateService, users_service_1.UsersService, notes_service_1.NotesService])
], AssignmentspController);
exports.AssignmentspController = AssignmentspController;
//# sourceMappingURL=assignment.controler.js.map