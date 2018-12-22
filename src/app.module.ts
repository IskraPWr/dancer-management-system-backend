import { GroupController } from './group/group.controler';
import { GroupService } from './group/group.service';
import { Group } from './group/group.entity';
import { InstallmentDateController } from './instrallmentDate/instrallmentDate.component';
import { InstallmentDateService } from './instrallmentDate/instrallmentDate.service';
import { Installment } from './instrallmentDate/instrallmentDate.entity';
import { NotesService } from './notes/notes.service';
import { PresenceService } from './presence/presence.service';
import { ListService } from './list/list.service';
import { List } from './list/list.entity';
import { Authorization } from './login/authorization.entity';
import { Admins } from './login/admins.entity';
import { Notes } from './notes/notes.entity';
import { Presence } from './presence/presence.entity';
import { Users } from './users/users.entity';
import { UsersService } from './users/users.service';
import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { LogoutController } from './logout/logout.controller';
import { UsersController } from './users/users.controller';
import { PresenceController } from './presence/presence.controller';
import { ChargesController } from './charges/charges.controller';
import { ListController } from './list/list.controller';
import { ArchivesController } from './archives/archives.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsUniversityController,
   StatisticsGenderController,
   StatisticsArchivesGenderController,
   StatisticsPeopleController,
   StatisticsChargesController,
   StatisticsPresenceWeekByIdController,
   StatisticsPresenceAllByIdController,
} from './stat/stat.controller';

@Module({
  imports: [ TypeOrmModule.forRoot(),
  TypeOrmModule.forFeature([Users, Presence, Notes, Admins, Authorization, List, Installment, Group]),
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
    StatisticsGenderController,
    StatisticsArchivesGenderController,
    StatisticsPeopleController,
    StatisticsChargesController,
    StatisticsPresenceWeekByIdController,
    StatisticsPresenceAllByIdController,
    InstallmentDateController,
    GroupController,
  ],
  providers: [AppService, UsersService, ListService, PresenceService, NotesService, InstallmentDateService, GroupService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
