import { Test, TestingModule } from '@nestjs/testing';
import { RiceplantsController } from './riceplants.controller';
import { RiceplantsService } from './riceplants.service';

describe('RiceplantsController', () => {
  let controller: RiceplantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiceplantsController],
      providers: [RiceplantsService],
    }).compile();

    controller = module.get<RiceplantsController>(RiceplantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
