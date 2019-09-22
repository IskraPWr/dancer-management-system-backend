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
const users_service_1 = require("./../users/users.service");
const common_1 = require("@nestjs/common");
let ArchivesController = class ArchivesController {
    constructor(db) {
        this.db = db;
    }
    findAll() {
        return this.db.findAllInactive();
    }
    add(idArray) {
        return this.db.addToArchive(idArray);
    }
    revert(idArray) {
        return this.db.unarchiveUsers(idArray);
    }
};
__decorate([
    common_1.Get(),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArchivesController.prototype, "findAll", null);
__decorate([
    common_1.Post('add'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArchivesController.prototype, "add", null);
__decorate([
    common_1.Post('revert'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArchivesController.prototype, "revert", null);
ArchivesController = __decorate([
    common_1.Controller('archives'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], ArchivesController);
exports.ArchivesController = ArchivesController;
//# sourceMappingURL=archives.controller.js.map