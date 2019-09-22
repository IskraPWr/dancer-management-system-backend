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
let Users = class Users {
    constructor(hashPass, name, surname, login, gender, email, phone, university, year, index, key1, key2, department) {
        this.name = name;
        this.surname = surname;
        this.login = login;
        this.password = hashPass;
        this.gender = gender;
        this.email = email;
        this.phone = phone;
        this.university = university;
        this.year = year;
        this.index = index;
        this.key1 = key1;
        this.key2 = key2;
        this.status = true;
        this.join_date = new Date();
        this.department = department;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Users.prototype, "id_user", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Users.prototype, "surname", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Users.prototype, "login", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], Users.prototype, "declaration", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], Users.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Users.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Users.prototype, "university", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Users.prototype, "department", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], Users.prototype, "year", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Users.prototype, "index", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Users.prototype, "key1", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Users.prototype, "key2", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Users.prototype, "status", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", Date)
], Users.prototype, "join_date", void 0);
Users = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], Users);
exports.Users = Users;
//# sourceMappingURL=users.entity.js.map