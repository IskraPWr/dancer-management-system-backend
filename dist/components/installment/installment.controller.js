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
const installment_service_1 = require("./installment.service");
const common_1 = require("@nestjs/common");
let InstallmentController = class InstallmentController {
    constructor(installment) {
        this.installment = installment;
    }
    findAll() {
        return Promise.all([
            this.installment.findType0(),
            this.installment.findType1(),
        ]).then(value => {
            return {
                type0: {
                    name: 'Osoby z PWr',
                    data: value[0],
                },
                type1: {
                    name: 'Osoby z poza PWr',
                    data: value[1],
                },
            };
        });
    }
    removeDate(message) {
        return this.installment.removeDate(message);
    }
    changeDate(message) {
        return this.installment.changeDate(message);
    }
    addDate(message) {
        return this.installment.addDate(message);
    }
};
__decorate([
    common_1.Get(),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InstallmentController.prototype, "findAll", null);
__decorate([
    common_1.Post('remove'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstallmentController.prototype, "removeDate", null);
__decorate([
    common_1.Post('change'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstallmentController.prototype, "changeDate", null);
__decorate([
    common_1.Post('add'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstallmentController.prototype, "addDate", null);
InstallmentController = __decorate([
    common_1.Controller('installment'),
    __metadata("design:paramtypes", [installment_service_1.InstallmentService])
], InstallmentController);
exports.InstallmentController = InstallmentController;
//# sourceMappingURL=installment.controller.js.map