import { Test, TestingModule } from '@nestjs/testing';
import { ListController } from './list.controller';

describe('List Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ListController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ListController = module.get<ListController>(ListController);
    expect(controller).toBeDefined();
  });
});
