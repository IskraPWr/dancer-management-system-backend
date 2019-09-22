import { Test, TestingModule } from '@nestjs/testing';
import { MembersController } from './members.controller';

describe('Members Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [MembersController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: MembersController = module.get<MembersController>(MembersController);
    expect(controller).toBeDefined();
  });
});
