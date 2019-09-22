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
const mail_data_1 = require("../../mailer/mail-data");
const admins_entity_1 = require("./admins.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const generator = require("generate-password");
const hash = require("password-hash");
let AdminsService = class AdminsService {
    constructor(adminsRepository) {
        this.adminsRepository = adminsRepository;
    }
    async findAll() {
        return await this.adminsRepository.find();
    }
    async removeAdmins(idArray) {
        return await Promise.resolve(idArray.ids.forEach(element => {
            this.adminsRepository.delete({
                id: element,
            });
        }));
    }
    async changeDate(message) {
        return await Promise.resolve(this.adminsRepository.find({
            id: message.id,
        })).then(admin => {
            if (admin[0]) {
                if (hash.verify(message.password, admin[0].password)) {
                    this.adminsRepository.update({
                        id: message.id,
                    }, {
                        [message.field]: message.value,
                    });
                }
                else {
                    throw new common_1.HttpException('Invalid user', common_1.HttpStatus.BAD_REQUEST);
                }
            }
        });
    }
    async addDate(message) {
        return await Promise.resolve().then(() => {
            const pass = generator.generate({
                length: 10,
                numbers: true,
            });
            new mail_data_1.Mail().sendMail('newSiteAdmin', message.email, { password: pass });
            const ent = this.adminsRepository.create(new admins_entity_1.Admins(message.name, message.surname, message.email, message.login, hash.generate(pass)));
            this.adminsRepository.insert(ent);
        });
    }
    async generatePass(password) {
        const pass = generator.generate({
            length: 10,
            numbers: true,
        });
        return await Promise.resolve()
            .then(() => {
            return this.adminsRepository.findOne({
                id: password.id,
            });
        })
            .then(admin => {
            new mail_data_1.Mail().sendMail('newPassSite', admin.email, { password: pass });
            this.adminsRepository.update({
                id: password.id,
            }, {
                password: hash.generate(pass),
            });
        });
    }
    async checkPass(message) {
        return await this.adminsRepository.findOne({
            id: message.id,
        }).then(admin => {
            if (!admin) {
                return false;
            }
            if (hash.verify(message.password, admin.password)) {
                return true;
            }
            return false;
        }).catch(error => {
            throw new common_1.HttpException('Error', 404);
        });
    }
};
AdminsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(admins_entity_1.Admins)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdminsService);
exports.AdminsService = AdminsService;
//# sourceMappingURL=admins.service.js.map