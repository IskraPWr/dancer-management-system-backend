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
let Installment = class Installment {
    constructor(name, start, date_1, date_2, date_3, end) {
        this.name = name;
        this.start = new Date(start);
        this.date_1 = new Date(date_1);
        this.date_2 = new Date(date_2);
        this.date_3 = new Date(date_3);
        this.end = new Date(end);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Installment.prototype, "id_semester", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Installment.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", Date)
], Installment.prototype, "start", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", Date)
], Installment.prototype, "date_1", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", Date)
], Installment.prototype, "date_2", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", Date)
], Installment.prototype, "date_3", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", Date)
], Installment.prototype, "end", void 0);
Installment = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], Installment);
exports.Installment = Installment;
//# sourceMappingURL=instrallmentDate.entity.js.map