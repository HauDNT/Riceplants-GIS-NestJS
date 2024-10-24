import { Test, TestingModule } from '@nestjs/testing';
import { RiceplantsService } from './riceplants.service';

describe('RiceplantsService', () => {
  let service: RiceplantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiceplantsService],
    }).compile();

    service = module.get<RiceplantsService>(RiceplantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
