import { Test, TestingModule } from '@nestjs/testing';
import { DispatchRicesController } from './dispatch_rices.controller';
import { DispatchRicesService } from './dispatch_rices.service';

describe('DispatchRicesController', () => {
  let controller: DispatchRicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispatchRicesController],
      providers: [DispatchRicesService],
    }).compile();

    controller = module.get<DispatchRicesController>(DispatchRicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
