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
const admins_service_1 = require("./admins.service");
const common_1 = require("@nestjs/common");
let AdminsController = class AdminsController {
    constructor(admins) {
        this.admins = admins;
    }
    findAll() {
        return Promise.resolve(this.admins.findAll()).then(data => {
            for (let i = 0; i < Object.keys(data).length; i++) {
                let buffer = '';
                for (let j = 0; j < 10; j++) {
                    buffer += '*';
                }
                data[i].password = buffer;
            }
            return data;
        });
    }
    removeAdmins(message) {
        return this.admins.removeAdmins(message);
    }
    changeDate(message) {
        return this.admins.changeDate(message);
    }
    addDate(message) {
        return this.admins.addDate(message);
    }
    generatePass(message) {
        return this.admins.generatePass(message);
    }
    checkPass(message) {
        return this.admins.checkPass(message);
    }
};
__decorate([
    common_1.Get(),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminsController.prototype, "findAll", null);
__decorate([
    common_1.Post('remove'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminsController.prototype, "removeAdmins", null);
__decorate([
    common_1.Post('change'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminsController.prototype, "changeDate", null);
__decorate([
    common_1.Post('add'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminsController.prototype, "addDate", null);
__decorate([
    common_1.Post('generate'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminsController.prototype, "generatePass", null);
__decorate([
    common_1.Post('check'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminsController.prototype, "checkPass", null);
AdminsController = __decorate([
    common_1.Controller('admins'),
    __metadata("design:paramtypes", [admins_service_1.AdminsService])
], AdminsController);
exports.AdminsController = AdminsController;
//# sourceMappingURL=admins.controller.js.map