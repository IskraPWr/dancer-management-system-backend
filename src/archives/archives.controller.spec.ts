import { Test, TestingModule } from '@nestjs/testing';
import { ArchivesController } from './archives.controller';

describe('Archives Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ArchivesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ArchivesController = module.get<ArchivesController>(ArchivesController);
    expect(controller).toBeDefined();
  });
});
