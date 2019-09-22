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
const group_entity_1 = require("./../group/group.entity");
const instrallmentDate_entity_1 = require("./instrallmentDate.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let InstallmentDateService = class InstallmentDateService {
    constructor(installmentRepository, groupRepository, presenceRepository) {
        this.installmentRepository = installmentRepository;
        this.groupRepository = groupRepository;
        this.presenceRepository = presenceRepository;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.installmentRepository.query('SELECT * FROM `installment` ORDER BY `installment`.`end` DESC');
        });
    }
    getAllHeaders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.installmentRepository.query('SELECT `id_semester`, `name` FROM `installment` ORDER BY `installment`.`end` DESC');
        });
    }
    getAllSemetersStartAndEnd() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.installmentRepository.query('SELECT `id_semester`, `start`, `end`, `name` FROM `installment` ORDER BY `installment`.`end` DESC');
        });
    }
    findSemesterByIdGroup(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.installmentRepository.query('SELECT `installment`.`start`, `installment`.`end` FROM `installment`, `group` WHERE `installment`.`id_semester`=`group`.`id_semester` AND `group`.`id`=' +
                id);
        });
    }
    changeDate(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.installmentRepository.update({
                id_semester: message.id,
            }, {
                [message.field]: message.field === 'name'
                    ? message.value
                    : new Date(new Date(message.value).setHours(23, 59, 59, 999)),
            });
        });
    }
    addDate(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.resolve()
                .then(() => {
                const ent = this.installmentRepository.create(new instrallmentDate_entity_1.Installment(message.name, message.start, message.date_1, message.date_2, message.date_3, message.end));
                this.installmentRepository.insert(ent);
            })
                .catch(er => {
                console.log(er);
            });
        });
    }
    removeDate(idArray) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.resolve(idArray.ids.forEach(element => {
                Promise.resolve(this.groupRepository.find({
                    id_semester: element
                })).then(groups => {
                    groups.forEach(group => {
                        this.presenceRepository.delete({
                            id_group: group.id
                        });
                    });
                }).then(() => {
                    this.installmentRepository.delete({
                        id_semester: element,
                    });
                    this.groupRepository.delete({
                        id_semester: element,
                    });
                });
            }));
        });
    }
};
InstallmentDateService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(instrallmentDate_entity_1.Installment)),
    __param(1, typeorm_1.InjectRepository(group_entity_1.Group)),
    __param(2, typeorm_1.InjectRepository(presence_entity_1.Presence)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], InstallmentDateService);
exports.InstallmentDateService = InstallmentDateService;
//# sourceMappingURL=instrallmentDate.service.js.map