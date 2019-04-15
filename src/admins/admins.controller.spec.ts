import { Test, TestingModule } from '@nestjs/testing';
import { AdminsController } from './admins.controller';

describe('Admins Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AdminsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AdminsController = module.get<AdminsController>(AdminsController);
    expect(controller).toBeDefined();
  });
});
