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
const presence_entity_1 = require("./presence.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let PresenceService = class PresenceService {
    constructor(presenceRepository) {
        this.presenceRepository = presenceRepository;
    }
    async findAll() {
        return await this.presenceRepository.query('SELECT * FROM `presence` ORDER BY `presence`.`id_user` DESC');
    }
    async findByIdUser(nr) {
        return await this.presenceRepository.query('SELECT * FROM `presence` WHERE `id_user` = ' + nr + ' ORDER BY `presence`.`time` DESC');
    }
    async findAllFromActiveUsers() {
        return await this.presenceRepository.query('SELECT `presence`.`id_user`, `presence`.`time`, `presence`.`id_group` FROM `presence`, `users` WHERE `users`.`id_user` = `presence`.`id_user` AND `users`.`status` = 1 ORDER BY `presence`.`time` DESC');
    }
    async findAllFromSemesterById(id, semester) {
        return await this.presenceRepository.query('SELECT `presence`.`time`, `presence`.`id_group` FROM `presence`, `users`, `installment` WHERE `presence`.`id_user` = `users`.`id_user` AND `presence`.`time` >= `installment`.`start` AND `presence`.`time` <= `installment`.`end` AND `users`.`id_user` = ' + id + ' AND `installment`.`id_semester` = ' + semester + ' ORDER BY `presence`.`time` DESC');
    }
    async findAllPresenceInGroupByIdGroup(id) {
        return await this.presenceRepository.query("SELECT DISTINCT `presence`.`id_user`, `presence`.`time` FROM `users`, `presence` WHERE `users`.`status` = 1 AND `presence`.`id_group`= " + id + " ORDER BY `presence`.`id_user` ASC");
    }
};
PresenceService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(presence_entity_1.Presence)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PresenceService);
exports.PresenceService = PresenceService;
//# sourceMappingURL=presence.service.js.map