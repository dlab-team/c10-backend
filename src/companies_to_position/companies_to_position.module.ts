import { Module } from '@nestjs/common';
import { CompaniesToPositionService } from './companies_to_position.service';
import { CompaniesToPositionController } from './companies_to_position.controller';

@Module({
  controllers: [CompaniesToPositionController],
  providers: [CompaniesToPositionService]
})
export class CompaniesToPositionModule {}
