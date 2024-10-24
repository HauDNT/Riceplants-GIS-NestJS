import { Test, TestingModule } from '@nestjs/testing';
import { ReceivingSlipsController } from './receiving_slips.controller';
import { ReceivingSlipsService } from './receiving_slips.service';

describe('ReceivingSlipsController', () => {
  let controller: ReceivingSlipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceivingSlipsController],
      providers: [ReceivingSlipsService],
    }).compile();

    controller = module.get<ReceivingSlipsController>(ReceivingSlipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
