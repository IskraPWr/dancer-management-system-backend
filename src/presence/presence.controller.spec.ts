import { Test, TestingModule } from '@nestjs/testing';
import { PresenceController } from './presence.controller';

describe('Presence Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [PresenceController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: PresenceController = module.get<PresenceController>(PresenceController);
    expect(controller).toBeDefined();
  });
});
