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
const installment_entity_1 = require("./installment.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let InstallmentService = class InstallmentService {
    constructor(installmentsRepository) {
        this.installmentsRepository = installmentsRepository;
    }
    async findAll() {
        return await this.installmentsRepository.find();
    }
    async findType0() {
        return await this.installmentsRepository.find({ type: 0 });
    }
    async findType1() {
        return await this.installmentsRepository.find({ type: 1 });
    }
    async removeDate(idArray) {
        return await Promise.resolve(idArray.ids.forEach(element => {
            Promise.resolve(this.installmentsRepository.delete({
                id: element
            }));
        }));
    }
    async changeDate(message) {
        return await this.installmentsRepository.update({
            id: message.id,
        }, {
            [message.field]: message.value
        });
    }
    async addDate(message) {
        return await Promise.resolve()
            .then(() => {
            const ent = this.installmentsRepository.create(new installment_entity_1.Installments(message.name, message.installment_1, message.installment_2, message.installment_3, message.type));
            this.installmentsRepository.insert(ent);
        })
            .catch(er => {
            console.log(er);
        });
    }
};
InstallmentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(installment_entity_1.Installments)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InstallmentService);
exports.InstallmentService = InstallmentService;
//# sourceMappingURL=installment.service.js.map