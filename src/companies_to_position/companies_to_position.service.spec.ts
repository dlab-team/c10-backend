import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesToPositionService } from './companies_to_position.service';

describe('CompaniesToPositionService', () => {
  let service: CompaniesToPositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesToPositionService],
    }).compile();

    service = module.get<CompaniesToPositionService>(CompaniesToPositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
