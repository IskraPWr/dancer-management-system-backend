import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';

describe('MembersService', () => {
  let service: MembersService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembersService],
    }).compile();
    service = module.get<MembersService>(MembersService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
