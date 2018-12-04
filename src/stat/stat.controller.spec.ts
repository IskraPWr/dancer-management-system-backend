import { Test, TestingModule } from '@nestjs/testing';
import { StatController } from './stat.controller';

describe('Stat Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [StatController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: StatController = module.get<StatController>(StatController);
    expect(controller).toBeDefined();
  });
});
