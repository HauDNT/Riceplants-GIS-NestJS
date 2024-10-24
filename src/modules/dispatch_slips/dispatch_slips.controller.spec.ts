import { Test, TestingModule } from '@nestjs/testing';
import { DispatchSlipsController } from './dispatch_slips.controller';
import { DispatchSlipsService } from './dispatch_slips.service';

describe('DispatchSlipsController', () => {
  let controller: DispatchSlipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispatchSlipsController],
      providers: [DispatchSlipsService],
    }).compile();

    controller = module.get<DispatchSlipsController>(DispatchSlipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
