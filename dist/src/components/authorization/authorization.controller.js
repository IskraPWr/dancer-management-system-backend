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
const authorization_service_1 = require("./authorization.service");
const common_1 = require("@nestjs/common");
let AuthorizationController = class AuthorizationController {
    constructor(authorization) {
        this.authorization = authorization;
    }
    findAll() {
        return Promise.resolve(this.authorization.findAll()).then(data => {
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
        return this.authorization.removeAdmins(message);
    }
    changeDate(message) {
        return this.authorization.changeDate(message);
    }
    addDate(message) {
        return this.authorization.addDate(message);
    }
    generatePass(message) {
        return this.authorization.generatePass(message);
    }
    checkPass(message) {
        return this.authorization.checkPass(message);
    }
};
__decorate([
    common_1.Get(),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthorizationController.prototype, "findAll", null);
__decorate([
    common_1.Post('remove'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthorizationController.prototype, "removeAdmins", null);
__decorate([
    common_1.Post('change'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthorizationController.prototype, "changeDate", null);
__decorate([
    common_1.Post('add'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthorizationController.prototype, "addDate", null);
__decorate([
    common_1.Post('generate'),
    common_1.Header('access-control-allow-credentials', 'true'),
    common_1.Header('access-control-allow-origin', '*'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthorizationController.prototype, "generatePass", null);
__decorate([
    common_1.Post('check'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthorizationController.prototype, "checkPass", null);
AuthorizationController = __decorate([
    common_1.Controller('authorization'),
    __metadata("design:paramtypes", [authorization_service_1.AuthorizationService])
], AuthorizationController);
exports.AuthorizationController = AuthorizationController;
//# sourceMappingURL=authorization.controller.js.map