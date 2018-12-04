import { Test, TestingModule } from '@nestjs/testing';
import { LogoutController } from './logout.controller';

describe('Logout Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [LogoutController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: LogoutController = module.get<LogoutController>(LogoutController);
    expect(controller).toBeDefined();
  });
});
