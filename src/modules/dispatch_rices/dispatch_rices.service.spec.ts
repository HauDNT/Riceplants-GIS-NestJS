import { Test, TestingModule } from '@nestjs/testing';
import { DispatchRicesService } from './dispatch_rices.service';

describe('DispatchRicesService', () => {
  let service: DispatchRicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DispatchRicesService],
    }).compile();

    service = module.get<DispatchRicesService>(DispatchRicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
