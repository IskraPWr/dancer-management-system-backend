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
const presence_entity_1 = require("./../presence/presence.entity");
const group_entity_1 = require("./group.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let GroupService = class GroupService {
    constructor(groupRepository, presenceRepository) {
        this.groupRepository = groupRepository;
        this.presenceRepository = presenceRepository;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.groupRepository.query('SELECT * FROM `group` ORDER BY `group`.`id_semester` DESC');
        });
    }
    findAllOrderById() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.groupRepository.query('SELECT * FROM `group` ORDER BY `group`.`id` ASC');
        });
    }
    findAllBySemesterId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.groupRepository.query('SELECT * FROM `group` WHERE `group`.`id_semester` =' + id);
        });
    }
    findAllHeadersBySemesterId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.groupRepository.query('SELECT `id`, `name` FROM `group` WHERE `group`.`id_semester` =' + id);
        });
    }
    findAllUsersByIdGroup(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.groupRepository.query('SELECT DISTINCT `users`.`id_user`, `users`.`name` , `users`.`gender`,  `users`.`surname` FROM `members`, `users`, `group` WHERE  `users`.`id_user` = `members`.`id_user` AND `users`.`status` = 1 AND `members`.`id_group` =' + id + ' ORDER BY `users`.`id_user` ASC');
        });
    }
    findAllAssignment() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.groupRepository.query('SELECT DISTINCT `members`.`id`, `group`.`name` AS `group_name`, `installment`.`name` AS `semester_name`, `members`.`id_user` FROM `members`, `group`, `installment` WHERE `members`.`id_group` = `group`.`id` AND `installment`.`id_semester`= `group`.`id_semester` ORDER BY `members`.`id_user` ASC');
        });
    }
    findGroupById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.groupRepository.query('SELECT `group`.`day` FROM `group` WHERE `group`.`id`=' + id);
        });
    }
    removeDate(idArray) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.resolve(idArray.ids.forEach(element => {
                this.groupRepository.delete({
                    id: element,
                });
            }));
        });
    }
    changeDate(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.groupRepository.update({
                id: message.id,
            }, {
                [message.field]: message.value
            });
        });
    }
    addDate(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.resolve()
                .then(() => {
                const ent = this.groupRepository.create(new group_entity_1.Group(message.id_semester, message.name, message.day, message.start, message.end));
                this.groupRepository.insert(ent);
            });
        });
    }
};
GroupService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(group_entity_1.Group)),
    __param(1, typeorm_1.InjectRepository(presence_entity_1.Presence)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], GroupService);
exports.GroupService = GroupService;
//# sourceMappingURL=group.service.js.map