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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_entity_1 = require("./../tokens/tokens.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const core_1 = require("@nestjs/core");
let Guard = class Guard {
    constructor(reflector, tokensRepository) {
        this.reflector = reflector;
        this.tokensRepository = tokensRepository;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = this.reflector.get('roles', context.getHandler());
            const token = context.getArgs()[0]['headers'];
            const id = context.getArgs()[0]['params']['id'];
            if (!roles) {
                return true;
            }
            if (roles[0] === 'admin') {
                return yield this.tokensRepository
                    .findOne({
                    token: token,
                })
                    .then(admin => {
                    if (admin) {
                        if (admin.role === 2 &&
                            admin.date > new Date(new Date().valueOf() - 15 * 60 * 1000)) {
                            this.tokensRepository
                                .update({
                                token: token,
                            }, {
                                date: new Date(),
                            })
                                .then(() => {
                                return true;
                            });
                        }
                    }
                    return false;
                });
            }
            if (roles[0] === 'user') {
                return yield this.tokensRepository
                    .findOne({
                    token: token,
                })
                    .then(user => {
                    if (user) {
                        if (user.role === 0 &&
                            user.date > new Date(new Date().valueOf() - 15 * 60 * 1000) &&
                            user.id_user === parseInt(id, 10)) {
                            console.log(43);
                            this.tokensRepository.update({
                                token: token,
                            }, {
                                date: new Date(),
                            });
                            return true;
                        }
                    }
                    return false;
                });
            }
            return false;
        });
    }
};
Guard = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(tokens_entity_1.Tokens)),
    __metadata("design:paramtypes", [core_1.Reflector,
        typeorm_2.Repository])
], Guard);
exports.Guard = Guard;
//# sourceMappingURL=roles.guard.js.map