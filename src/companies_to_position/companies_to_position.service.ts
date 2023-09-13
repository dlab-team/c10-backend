import { Injectable } from '@nestjs/common';
import { CreateCompaniesToPositionDto } from './dto/create-companies_to_position.dto';
import { UpdateCompaniesToPositionDto } from './dto/update-companies_to_position.dto';

@Injectable()
export class CompaniesToPositionService {
  create(createCompaniesToPositionDto: CreateCompaniesToPositionDto) {
    return 'This action adds a new companiesToPosition';
  }

  findAll() {
    return `This action returns all companiesToPosition`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companiesToPosition`;
  }

  update(id: number, updateCompaniesToPositionDto: UpdateCompaniesToPositionDto) {
    return `This action updates a #${id} companiesToPosition`;
  }

  remove(id: number) {
    return `This action removes a #${id} companiesToPosition`;
  }
}
