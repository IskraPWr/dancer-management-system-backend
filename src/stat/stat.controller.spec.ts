import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsArchivesGenderController } from './stat.controller';

describe('Stat Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [StatisticsArchivesGenderController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: StatisticsArchivesGenderController = module.get<StatisticsArchivesGenderController>(StatisticsArchivesGenderController);
    expect(controller).toBeDefined();
  });
});
