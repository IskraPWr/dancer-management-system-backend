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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.presenceRepository.query('SELECT * FROM `presence` ORDER BY `presence`.`id_user` DESC');
        });
    }
    findByIdUser(nr) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.presenceRepository.query('SELECT * FROM `presence` WHERE `id_user` = ' + nr + ' ORDER BY `presence`.`time` DESC');
        });
    }
    findAllFromActiveUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.presenceRepository.query('SELECT `presence`.`id_user`, `presence`.`time`, `presence`.`id_group` FROM `presence`, `users` WHERE `users`.`id_user` = `presence`.`id_user` AND `users`.`status` = 1 ORDER BY `presence`.`time` DESC');
        });
    }
    findAllFromSemesterById(id, semester) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.presenceRepository.query('SELECT `presence`.`time`, `presence`.`id_group` FROM `presence`, `users`, `installment` WHERE `presence`.`id_user` = `users`.`id_user` AND `presence`.`time` >= `installment`.`start` AND `presence`.`time` <= `installment`.`end` AND `users`.`id_user` = ' + id + ' AND `installment`.`id_semester` = ' + semester + ' ORDER BY `presence`.`time` DESC');
        });
    }
    findAllPresenceInGroupByIdGroup(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.presenceRepository.query("SELECT DISTINCT `presence`.`id_user`, `presence`.`time` FROM `users`, `presence` WHERE `users`.`status` = 1 AND `presence`.`id_group`= " + id + " ORDER BY `presence`.`id_user` ASC");
        });
    }
};
PresenceService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(presence_entity_1.Presence)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PresenceService);
exports.PresenceService = PresenceService;
//# sourceMappingURL=presence.service.js.map