import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { LogoutController } from './logout/logout.controller';
import { UsersController } from './users/users.controller';
import { PresenceController } from './presence/presence.controller';
import { ChargesController } from './charges/charges.controller';
import { ListController } from './list/list.controller';
import { ArchivesController } from './archives/archives.controller';
import { StatisticsUniversityController,
   StatisticsGenderController,
   StatisticsArchivesGenderController,
   StatisticsPeopleController,
   StatisticsChargesController,
   StatisticsPresenceWeekByIdController,
   StatisticsPresenceAllByIdController,
} from './stat/stat.controller';

@Module({
  imports: [],
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
  ],
  providers: [AppService],
})
export class AppModule {}
