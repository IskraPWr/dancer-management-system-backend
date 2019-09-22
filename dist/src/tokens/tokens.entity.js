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
let Tokens = class Tokens {
    constructor(token, role, id) {
        this.token = token;
        this.id_user = id;
        this.role = role;
        this.date = new Date();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Tokens.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], Tokens.prototype, "id_user", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Tokens.prototype, "token", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], Tokens.prototype, "role", void 0);
__decorate([
    typeorm_1.Column('datetime'),
    __metadata("design:type", Date)
], Tokens.prototype, "date", void 0);
Tokens = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [String, Number, Object])
], Tokens);
exports.Tokens = Tokens;
//# sourceMappingURL=tokens.entity.js.map