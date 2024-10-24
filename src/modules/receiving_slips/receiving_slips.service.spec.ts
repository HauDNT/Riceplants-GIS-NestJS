import { Test, TestingModule } from '@nestjs/testing';
import { ReceivingSlipsService } from './receiving_slips.service';

describe('ReceivingSlipsService', () => {
  let service: ReceivingSlipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceivingSlipsService],
    }).compile();

    service = module.get<ReceivingSlipsService>(ReceivingSlipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
