import { Test, TestingModule } from '@nestjs/testing';
import { ChargesController } from './charges.controller';

describe('Charges Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ChargesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ChargesController = module.get<ChargesController>(ChargesController);
    expect(controller).toBeDefined();
  });
});
