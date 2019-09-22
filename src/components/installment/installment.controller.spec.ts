import { Test, TestingModule } from '@nestjs/testing';
import { InstallmentController } from './installment.controller';

describe('Installment Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [InstallmentController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: InstallmentController = module.get<InstallmentController>(InstallmentController);
    expect(controller).toBeDefined();
  });
});
