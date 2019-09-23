import { AssignmentspController } from './components/assignment/assignment.controler';
import { Tokens } from './tokens/tokens.entity';
import { AdminsService } from './components/admins/admins.service';
import { GroupController } from './components/group/group.controler';
import { GroupService } from './components/group/group.service';
import { Group } from './components/group/group.entity';
import { InstallmentDateController } from './components/instrallmentDate/instrallmentDate.controller';
import { InstallmentDateService } from './components/instrallmentDate/instrallmentDate.service';
import { Installment } from './components/instrallmentDate/instrallmentDate.entity';
import { NotesService } from './components/notes/notes.service';
import { PresenceService } from './components/presence/presence.service';
import { ListService } from './components/list/list.service';
import { List } from './components/list/list.entity';
import { Authorization } from './components/authorization/authorization.entity';
import { Admins } from './components/admins/admins.entity';
import { Notes } from './components/notes/notes.entity';
import { Presence } from './components/presence/presence.entity';
import { Users } from './components/users/users.entity';
import { UsersService } from './components/users/users.service';
import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './components/login/login.controller';
import { LogoutController } from './components/logout/logout.controller';
import { UsersController } from './components/users/users.controller';
import { PresenceController } from './components/presence/presence.controller';
import { ChargesController } from './components/charges/charges.controller';
import { ListController } from './components/list/list.controller';
import { ArchivesController } from './components/archives/archives.controller';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  StatisticsUniversityController,
} from './components/stat/stat.controller';
import { AdminsController } from './components/admins/admins.controller';
import { AuthorizationController } from './components/authorization/authorization.controller';
import { InstallmentController } from './components/installment/installment.controller';
import { MembersController } from './components/members/members.controller';
import { MembersService } from './components/members/members.service';
import { Guard } from './guards/roles.guard';
import { Members } from './components/members/members.entity';
import { NotesController } from './components/notes/notes.controller';
import { InstallmentService } from './components/installment/installment.service';
import { Installments } from './components/installment/installment.entity';
import { AuthorizationService } from './components/authorization/authorization.service';
import { StatService } from './components/stat/stat.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql.sktt.cba.pl',
      port: 3306,
      username: 'Iskra',
      password: 'B6k960x4j4',
      database: 'gregkikut',
      entities: [
        Users,
        Tokens,
        Presence,
        Notes,
        Admins,
        Authorization,
        List,
        Installment,
        Group,
        Admins,
        Installments,
        Members,
      ],
    }),
    TypeOrmModule.forFeature([
      Users,
      Tokens,
      Presence,
      Notes,
      Admins,
      Authorization,
      List,
      Installment,
      Group,
      Admins,
      Installments,
      Members,
    ]),
  ],
  controllers: [
    AppController,
    LoginController,
    LogoutController,
    UsersController,
    PresenceController,
    ChargesController,
    ListController,
    ArchivesController,
    StatisticsUniversityController,
    InstallmentDateController,
    GroupController,
    AdminsController,
    AuthorizationController,
    InstallmentController,
    NotesController,
    MembersController,
    AssignmentspController,
  ],
  providers: [
    AppService,
    UsersService,
    ListService,
    PresenceService,
    NotesService,
    InstallmentDateService,
    GroupService,
    AdminsService,
    AuthorizationService,
    InstallmentService,
    MembersService,
    StatService,
    Guard,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
