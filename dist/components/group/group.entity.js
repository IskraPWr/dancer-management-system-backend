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
let Group = class Group {
    constructor(id_semester, name, day, start, end) {
        this.id_semester = id_semester;
        this.name = name;
        this.day = day;
        this.start = start;
        this.end = end;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Group.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], Group.prototype, "id_semester", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], Group.prototype, "day", void 0);
__decorate([
    typeorm_1.Column('time'),
    __metadata("design:type", String)
], Group.prototype, "start", void 0);
__decorate([
    typeorm_1.Column('time'),
    __metadata("design:type", String)
], Group.prototype, "end", void 0);
Group = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], Group);
exports.Group = Group;
//# sourceMappingURL=group.entity.js.map