import { Test, TestingModule } from '@nestjs/testing';
import { ReceivingRicesService } from './receiving_rices.service';

describe('ReceivingRicesService', () => {
  let service: ReceivingRicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceivingRicesService],
    }).compile();

    service = module.get<ReceivingRicesService>(ReceivingRicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
