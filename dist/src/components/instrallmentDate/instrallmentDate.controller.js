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
const instrallmentDate_service_1 = require("./instrallmentDate.service");
const common_1 = require("@nestjs/common");
let InstallmentDateController = class InstallmentDateController {
    constructor(installmentDate) {
        this.installmentDate = installmentDate;
    }
    findAll() {
        return this.installmentDate.findAll();
    }
    getAllHeaders() {
        return this.installmentDate.getAllHeaders();
    }
    getAllSemestersDetails() {
        return this.installmentDate.getAllSemetersStartAndEnd();
    }
    changeDate(message) {
        return this.installmentDate.changeDate(message);
    }
    addDate(message) {
        return this.installmentDate.addDate(message);
    }
    removeDate(message) {
        return this.installmentDate.removeDate(message);
    }
};
__decorate([
    common_1.Get(),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InstallmentDateController.prototype, "findAll", null);
__decorate([
    common_1.Get('headers'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InstallmentDateController.prototype, "getAllHeaders", null);
__decorate([
    common_1.Get('details'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InstallmentDateController.prototype, "getAllSemestersDetails", null);
__decorate([
    common_1.Post('change'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstallmentDateController.prototype, "changeDate", null);
__decorate([
    common_1.Post('add'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstallmentDateController.prototype, "addDate", null);
__decorate([
    common_1.Post('remove'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstallmentDateController.prototype, "removeDate", null);
InstallmentDateController = __decorate([
    common_1.Controller('semesters'),
    __metadata("design:paramtypes", [instrallmentDate_service_1.InstallmentDateService])
], InstallmentDateController);
exports.InstallmentDateController = InstallmentDateController;
//# sourceMappingURL=instrallmentDate.controller.js.map