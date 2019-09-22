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
const validators_1 = require("./../../validators/validators");
const notes_service_1 = require("./../notes/notes.service");
const users_service_1 = require("./users.service");
const common_1 = require("@nestjs/common");
const users_entity_1 = require("./users.entity");
let UsersController = class UsersController {
    constructor(users, notes) {
        this.users = users;
        this.notes = notes;
    }
    deleteUsers(idArray) {
        return this.users.deleteUsers(idArray);
    }
    deleteUserById(id) {
        return this.users.deleteUserById(id);
    }
    generatePass(message) {
        return this.users.generatePass(message);
    }
    findOne(id) {
        return this.users.findOne(id);
    }
    findAll() {
        return Promise.all([this.users.findAllActive(), this.notes.findAll()]).then(value => {
            const data = [];
            const usersQuantity = Object.keys(value[0]).length;
            const notesQuantity = Object.keys(value[1]).length;
            let lastNoteId = 0;
            for (let i = 0; i < usersQuantity; i++) {
                const obj = {
                    id: value[0][i].id_user,
                    name: value[0][i].name,
                    surname: value[0][i].surname,
                    email: value[0][i].email,
                    phone: value[0][i].phone,
                    university: value[0][i].university,
                    department: value[0][i].department,
                    year: value[0][i].year,
                    index: value[0][i].index,
                    notes: [],
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
                data.push(obj);
            }
            return data;
        });
    }
    addUser(message) {
        return this.users.addUser(message);
    }
    check(idArray) {
        return this.users.isExistLogin(idArray);
    }
    checkPhone(idArray) {
        return this.users.isExistPhone(idArray);
    }
    checkKey(idArray) {
        return this.users.isExistKey(idArray);
    }
    checkEmail(idArray) {
        return this.users.isExistEmail(idArray);
    }
    putUserData(user) {
        return this.users.putUserData(user);
    }
    putUserPassword(password) {
        return this.users.putUserPassword(password);
    }
    putUserLogin(login) {
        return this.users.putUserLogin(login);
    }
    putUserKey(key) {
        return this.users.putUserKey(key);
    }
};
__decorate([
    common_1.Post('delete'),
    common_1.SetMetadata('roles', ['admin']),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUsers", null);
__decorate([
    common_1.Delete('delete/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUserById", null);
__decorate([
    common_1.Post('generate'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validators_1.GeneratePass]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "generatePass", null);
__decorate([
    common_1.Get(':id'),
    common_1.SetMetadata('roles', ['user']),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    common_1.Get(),
    common_1.SetMetadata('roles', ['admin']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    common_1.Post('add'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validators_1.NewAccountData]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addUser", null);
__decorate([
    common_1.Post('exist/login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "check", null);
__decorate([
    common_1.Post('exist/phone'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "checkPhone", null);
__decorate([
    common_1.Post('exist/key'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "checkKey", null);
__decorate([
    common_1.Post('exist/email'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "checkEmail", null);
__decorate([
    common_1.Put('user'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.Users]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "putUserData", null);
__decorate([
    common_1.Put('password'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "putUserPassword", null);
__decorate([
    common_1.Put('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "putUserLogin", null);
__decorate([
    common_1.Put('key'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "putUserKey", null);
UsersController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, notes_service_1.NotesService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map