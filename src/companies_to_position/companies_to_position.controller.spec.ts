import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesToPositionController } from './companies_to_position.controller';
import { CompaniesToPositionService } from './companies_to_position.service';

describe('CompaniesToPositionController', () => {
  let controller: CompaniesToPositionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesToPositionController],
      providers: [CompaniesToPositionService],
    }).compile();

    controller = module.get<CompaniesToPositionController>(CompaniesToPositionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
