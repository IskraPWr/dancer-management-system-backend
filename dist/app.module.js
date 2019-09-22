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
const assignment_controler_1 = require("./components/assignment/assignment.controler");
const tokens_entity_1 = require("./tokens/tokens.entity");
const admins_service_1 = require("./components/admins/admins.service");
const group_controler_1 = require("./components/group/group.controler");
const group_service_1 = require("./components/group/group.service");
const group_entity_1 = require("./components/group/group.entity");
const instrallmentDate_controller_1 = require("./components/instrallmentDate/instrallmentDate.controller");
const instrallmentDate_service_1 = require("./components/instrallmentDate/instrallmentDate.service");
const instrallmentDate_entity_1 = require("./components/instrallmentDate/instrallmentDate.entity");
const notes_service_1 = require("./components/notes/notes.service");
const presence_service_1 = require("./components/presence/presence.service");
const list_service_1 = require("./components/list/list.service");
const list_entity_1 = require("./components/list/list.entity");
const authorization_entity_1 = require("./components/authorization/authorization.entity");
const admins_entity_1 = require("./components/admins/admins.entity");
const notes_entity_1 = require("./components/notes/notes.entity");
const presence_entity_1 = require("./components/presence/presence.entity");
const users_entity_1 = require("./components/users/users.entity");
const users_service_1 = require("./components/users/users.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const login_controller_1 = require("./components/login/login.controller");
const logout_controller_1 = require("./components/logout/logout.controller");
const users_controller_1 = require("./components/users/users.controller");
const presence_controller_1 = require("./components/presence/presence.controller");
const charges_controller_1 = require("./components/charges/charges.controller");
const list_controller_1 = require("./components/list/list.controller");
const archives_controller_1 = require("./components/archives/archives.controller");
const typeorm_2 = require("@nestjs/typeorm");
const stat_controller_1 = require("./components/stat/stat.controller");
const admins_controller_1 = require("./components/admins/admins.controller");
const authorization_controller_1 = require("./components/authorization/authorization.controller");
const installment_controller_1 = require("./components/installment/installment.controller");
const members_controller_1 = require("./components/members/members.controller");
const members_service_1 = require("./components/members/members.service");
const roles_guard_1 = require("./guards/roles.guard");
const members_entity_1 = require("./components/members/members.entity");
const notes_controller_1 = require("./components/notes/notes.controller");
const installment_service_1 = require("./components/installment/installment.service");
const installment_entity_1 = require("./components/installment/installment.entity");
const authorization_service_1 = require("./components/authorization/authorization.service");
const stat_service_1 = require("./components/stat/stat.service");
let AppModule = class AppModule {
    constructor(connection) {
        this.connection = connection;
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_2.TypeOrmModule.forRoot(),
            typeorm_2.TypeOrmModule.forFeature([
                users_entity_1.Users,
                tokens_entity_1.Tokens,
                presence_entity_1.Presence,
                notes_entity_1.Notes,
                admins_entity_1.Admins,
                authorization_entity_1.Authorization,
                list_entity_1.List,
                instrallmentDate_entity_1.Installment,
                group_entity_1.Group,
                admins_entity_1.Admins,
                installment_entity_1.Installments,
                members_entity_1.Members,
            ]),
        ],
        controllers: [
            app_controller_1.AppController,
            login_controller_1.LoginController,
            logout_controller_1.LogoutController,
            users_controller_1.UsersController,
            presence_controller_1.PresenceController,
            charges_controller_1.ChargesController,
            list_controller_1.ListController,
            archives_controller_1.ArchivesController,
            stat_controller_1.StatisticsUniversityController,
            instrallmentDate_controller_1.InstallmentDateController,
            group_controler_1.GroupController,
            admins_controller_1.AdminsController,
            authorization_controller_1.AuthorizationController,
            installment_controller_1.InstallmentController,
            notes_controller_1.NotesController,
            members_controller_1.MembersController,
            assignment_controler_1.AssignmentspController,
        ],
        providers: [
            app_service_1.AppService,
            users_service_1.UsersService,
            list_service_1.ListService,
            presence_service_1.PresenceService,
            notes_service_1.NotesService,
            instrallmentDate_service_1.InstallmentDateService,
            group_service_1.GroupService,
            admins_service_1.AdminsService,
            authorization_service_1.AuthorizationService,
            installment_service_1.InstallmentService,
            members_service_1.MembersService,
            stat_service_1.StatService,
            roles_guard_1.Guard,
        ],
    }),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map