import { Test, TestingModule } from '@nestjs/testing';
import { DispatchSlipsService } from './dispatch_slips.service';

describe('DispatchSlipsService', () => {
  let service: DispatchSlipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DispatchSlipsService],
    }).compile();

    service = module.get<DispatchSlipsService>(DispatchSlipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
