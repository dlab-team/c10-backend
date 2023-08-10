import { PartialType } from '@nestjs/mapped-types';
import { CreateCompaniesToPositionDto } from './create-companies_to_position.dto';

export class UpdateCompaniesToPositionDto extends PartialType(CreateCompaniesToPositionDto) {
  id_companies?: number;
  id_target_position?: number;
}
