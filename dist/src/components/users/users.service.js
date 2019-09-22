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
const mail_data_1 = require("./../../mailer/mail-data");
const authorization_entity_1 = require("./../authorization/authorization.entity");
const admins_entity_1 = require("./../admins/admins.entity");
const members_entity_1 = require("./../members/members.entity");
const users_entity_1 = require("./users.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hash = require("password-hash");
const generator = require("generate-password");
const tokens_entity_1 = require("src/tokens/tokens.entity");
const notes_entity_1 = require("../notes/notes.entity");
let UsersService = class UsersService {
    constructor(usersRepository, membersRepository, notesRepository, tokensRepository, adminsRepository, authorizationRepository) {
        this.usersRepository = usersRepository;
        this.membersRepository = membersRepository;
        this.notesRepository = notesRepository;
        this.tokensRepository = tokensRepository;
        this.adminsRepository = adminsRepository;
        this.authorizationRepository = authorizationRepository;
    }
    async findAllActive() {
        return await this.usersRepository.find({
            status: true,
        });
    }
    async findAllInactive() {
        return await this.usersRepository
            .find({
            status: false,
        })
            .then((data) => {
            return data.map(user => {
                const { name, surname, gender, phone, university, id_user, index, department, year, email, } = user;
                return {
                    name,
                    surname,
                    gender,
                    phone,
                    university,
                    id: id_user,
                    index,
                    department,
                    year,
                    email,
                };
            });
        });
    }
    async findOneAll(id) {
        return await this.usersRepository.findOneOrFail({ id_user: id });
    }
    async findOne(id) {
        return await this.usersRepository
            .findOne({
            id_user: id,
        })
            .then((user) => {
            delete user.password;
            delete user.login;
            delete user.id_user;
            return user;
        });
    }
    async findUsersWithPresence() {
        return await this.usersRepository.query('SELECT DISTINCT `users`.`id_user`,`users`.`name`, `users`.`surname` FROM `users`, `presence` WHERE `users`.`id_user` = `presence`.`id_user` AND `users`.`status` = 1 ORDER BY `users`.`id_user` ASC');
    }
    async addToArchive(idArray) {
        return await Promise.resolve(idArray.ids.forEach(element => {
            Promise.all([
                this.membersRepository.delete({
                    id_user: element,
                }),
                this.notesRepository.delete({
                    id_user: element,
                }),
            ]).then(() => {
                this.usersRepository.update({
                    id_user: element,
                }, {
                    status: false,
                });
            });
        }));
    }
    async unarchiveUsers(idArray) {
        return await Promise.resolve(idArray.ids.forEach(element => {
            this.usersRepository.update({
                id_user: element,
            }, {
                status: true,
            });
        }));
    }
    async deleteUsers(idArray) {
        return await Promise.resolve(idArray.ids.forEach(element => {
            this.usersRepository.delete({
                id_user: element,
            });
        }));
    }
    async deleteUserById(id) {
        return this.usersRepository.delete({
            id_user: id,
        }).then((result) => {
            if (result.affected === 0) {
                throw new common_1.HttpException('notFound', common_1.HttpStatus.BAD_REQUEST);
            }
        }).catch(error => {
            throw new common_1.HttpException('notFound', common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async generatePass(message) {
        return await Promise.all([
            this.usersRepository.findOne({
                login: message.login,
                email: message.email,
            }),
            this.adminsRepository.findOne({
                login: message.login,
                email: message.email,
            }),
        ]).then(([user, admin]) => {
            const pass = generator.generate({
                length: 10,
                numbers: true,
            });
            if (user) {
                this.usersRepository.update({
                    login: message.login,
                    email: message.email,
                }, {
                    password: hash.generate(pass),
                });
                new mail_data_1.Mail().sendMail('newPassUser', user.email, { password: pass });
            }
            else if (admin) {
                this.adminsRepository.update({
                    login: message.login,
                    email: message.email,
                }, {
                    password: hash.generate(pass),
                });
                new mail_data_1.Mail().sendMail('newPassSite', admin.email, { password: pass });
            }
            else {
                throw new common_1.HttpException('Invalid user', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    async login(message) {
        return await Promise.all([
            this.usersRepository.findOne({
                login: message.login,
            }),
            this.usersRepository.findOne({
                email: message.login,
            }),
            this.authorizationRepository.findOne({
                login: message.login,
            }),
            this.authorizationRepository.findOne({
                email: message.login,
            }),
            this.adminsRepository.findOne({
                login: message.login,
            }),
            this.adminsRepository.findOne({
                email: message.login,
            }),
        ]).then(([user, userByEmail, appAdmin, appAdminByEmail, admin, adminByEmail]) => {
            const token = generator.generate({
                length: 50,
                numbers: true,
                excludeSimilarCharacters: true,
            });
            if (user || userByEmail) {
                if (user
                    ? hash.verify(message.password, user.password)
                    : hash.verify(message.password, userByEmail.password)) {
                    const el = this.tokensRepository.create(new tokens_entity_1.Tokens(token, 0, user ? user.id_user : userByEmail.id_user));
                    this.tokensRepository.insert(el);
                    return JSON.stringify({
                        token: token,
                        role: 'user',
                        id: user.id_user,
                    });
                }
                else {
                    throw new common_1.HttpException('Invalid user', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else if (appAdmin || appAdminByEmail) {
                if (appAdmin
                    ? hash.verify(message.password, appAdmin.password)
                    : hash.verify(message.password, appAdminByEmail.password)) {
                    const el = this.tokensRepository.create(new tokens_entity_1.Tokens(token, 1, appAdmin ? appAdmin.id : appAdminByEmail.id));
                    this.tokensRepository.insert(el);
                    return JSON.stringify({
                        token: token,
                        role: 'appAdmin',
                        id: appAdmin.id,
                    });
                }
                else {
                    throw new common_1.HttpException('Invalid user', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else if (admin || adminByEmail) {
                if (hash.verify(message.password, admin.password) ||
                    hash.verify(message.password, adminByEmail.password)) {
                    const el = this.tokensRepository.create(new tokens_entity_1.Tokens(token, 2, admin.id ? admin.id : adminByEmail.id));
                    this.tokensRepository.insert(el);
                    return JSON.stringify({
                        token: token,
                        role: 'admin',
                        id: admin.id,
                    });
                }
                else {
                    throw new common_1.HttpException('Invalid user', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else {
                throw new common_1.HttpException('Invalid user', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    async logout() { }
    async addUser(newUser) {
        return await Promise.resolve()
            .then(() => {
            const ent = this.usersRepository.create(new users_entity_1.Users(hash.generate(newUser.password), newUser.name, newUser.surname, newUser.login, newUser.gender, newUser.email, newUser.phone, newUser.university, newUser.year, newUser.index, newUser.key1, newUser.key2, newUser.department));
            return this.usersRepository.insert(ent);
        })
            .then(() => {
            return new mail_data_1.Mail().sendMail('newUser', newUser.email);
        })
            .catch((err) => {
            throw new common_1.HttpException('Internal Server Error', 500);
        });
    }
    async isExistPhone(phoneMessage) {
        return await this.usersRepository
            .findOne({
            phone: phoneMessage.phone,
        })
            .then((user) => {
            if (!user) {
                return null;
            }
            if (phoneMessage.id) {
                if (user.id_user === phoneMessage.id) {
                    return null;
                }
            }
            return { phoneExist: true };
        });
    }
    async isExistLogin(loginMessage) {
        return await this.usersRepository
            .findOne({
            login: loginMessage.login,
        })
            .then((user) => {
            if (!user) {
                return null;
            }
            if (loginMessage.id) {
                if (user.id_user === loginMessage.id) {
                    return null;
                }
            }
            return { loginExist: true };
        });
    }
    async isExistEmail(emailMessage) {
        return await this.usersRepository
            .findOne({
            email: emailMessage.email,
        })
            .then((user) => {
            if (!user) {
                return null;
            }
            if (emailMessage.id) {
                if (user.id_user === emailMessage.id) {
                    return null;
                }
            }
            return { emailExist: true };
        });
    }
    async isExistKey(keyMessage) {
        return await Promise.all([
            this.usersRepository.findOne({
                key1: keyMessage.key,
            }),
            this.usersRepository.findOne({
                key2: keyMessage.key,
            }),
        ]).then(users => {
            if (!users[0] && !users[1]) {
                return null;
            }
            if (users[0]) {
                if (users[0].key1 === '' ||
                    users[0].key1 === undefined ||
                    users[0].key1 === null) {
                    return null;
                }
                else if (keyMessage.id) {
                    if (users[0].id_user === keyMessage.id) {
                        return null;
                    }
                }
            }
            if (users[1]) {
                if (users[1].key2 === '' ||
                    users[1].key2 === undefined ||
                    users[1].key2 === null) {
                    return null;
                }
                else if (keyMessage.id) {
                    if (users[1].id_user === keyMessage.id) {
                        return null;
                    }
                }
            }
            return { keyExist: true };
        });
    }
    putUserData(newUser) {
        return this.usersRepository
            .update({
            id_user: newUser.id_user,
        }, {
            department: newUser.department,
            email: newUser.email,
            index: newUser.index,
            name: newUser.name,
            phone: newUser.phone,
            surname: newUser.surname,
            university: newUser.university,
            year: newUser.year,
        })
            .catch(error => {
            throw new common_1.HttpException('notFound', common_1.HttpStatus.BAD_REQUEST);
        });
    }
    putUserPassword(password) {
        return this.usersRepository.findOne({
            id_user: password.id_user
        }).then(user => {
            if (!user) {
                throw new common_1.HttpException('notFound', common_1.HttpStatus.BAD_REQUEST);
            }
            if (hash.verify(password.opass, user.password)) {
                return this.usersRepository.update({
                    id_user: password.id_user,
                }, {
                    password: hash.generate(password.pass),
                });
            }
            else {
                throw new common_1.HttpException('notFound', common_1.HttpStatus.BAD_REQUEST);
            }
        }).then((result) => {
            if (result.raw['changedRows'] === 0) {
                throw new common_1.HttpException('notFound', common_1.HttpStatus.BAD_REQUEST);
            }
        }).catch(error => {
            throw new common_1.HttpException('notFound', common_1.HttpStatus.BAD_REQUEST);
        });
    }
    putUserLogin(login) {
        return this.usersRepository
            .update({
            id_user: login.id_user,
            login: login.ologin
        }, {
            login: login.login,
        }).then((result) => {
            if (result.raw['changedRows'] === 0) {
                throw new common_1.HttpException('notFound', common_1.HttpStatus.BAD_REQUEST);
            }
        })
            .catch(error => {
            throw new common_1.HttpException('notFound', common_1.HttpStatus.BAD_REQUEST);
        });
    }
    putUserKey(key) {
        return this.usersRepository
            .update({
            id_user: key.id_user,
        }, {
            key1: key.key1,
            key2: key.key2,
        })
            .catch(error => {
            throw new common_1.HttpException('notFound', common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(users_entity_1.Users)),
    __param(1, typeorm_1.InjectRepository(members_entity_1.Members)),
    __param(2, typeorm_1.InjectRepository(notes_entity_1.Notes)),
    __param(3, typeorm_1.InjectRepository(tokens_entity_1.Tokens)),
    __param(4, typeorm_1.InjectRepository(admins_entity_1.Admins)),
    __param(5, typeorm_1.InjectRepository(authorization_entity_1.Authorization)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map