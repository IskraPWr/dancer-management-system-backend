import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationController } from './authorization.controller';

describe('Authorization Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AuthorizationController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AuthorizationController = module.get<AuthorizationController>(AuthorizationController);
    expect(controller).toBeDefined();
  });
});
