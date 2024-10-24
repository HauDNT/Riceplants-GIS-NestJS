import { Test, TestingModule } from '@nestjs/testing';
import { ReceivingRicesController } from './receiving_rices.controller';
import { ReceivingRicesService } from './receiving_rices.service';

describe('ReceivingRicesController', () => {
  let controller: ReceivingRicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceivingRicesController],
      providers: [ReceivingRicesService],
    }).compile();

    controller = module.get<ReceivingRicesController>(ReceivingRicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
