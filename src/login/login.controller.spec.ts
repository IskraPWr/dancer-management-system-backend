import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';

describe('Login Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [LoginController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: LoginController = module.get<LoginController>(LoginController);
    expect(controller).toBeDefined();
  });
});
