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
const typeorm_1 = require("typeorm");
let Installments = class Installments {
    constructor(name, installment_1, installment_2, installment_3, type) {
        this.name = name;
        this.installment_1 = installment_1;
        this.installment_2 = installment_2;
        this.installment_3 = installment_3;
        this.type = type;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Installments.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Installments.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], Installments.prototype, "installment_1", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], Installments.prototype, "installment_2", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], Installments.prototype, "installment_3", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], Installments.prototype, "type", void 0);
Installments = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], Installments);
exports.Installments = Installments;
//# sourceMappingURL=installment.entity.js.map