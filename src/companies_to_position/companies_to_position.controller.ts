import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompaniesToPositionService } from './companies_to_position.service';
import { CreateCompaniesToPositionDto } from './dto/create-companies_to_position.dto';
import { UpdateCompaniesToPositionDto } from './dto/update-companies_to_position.dto';

@Controller('companies-to-position')
export class CompaniesToPositionController {
  constructor(private readonly companiesToPositionService: CompaniesToPositionService) {}

  @Post()
  create(@Body() createCompaniesToPositionDto: CreateCompaniesToPositionDto) {
    return this.companiesToPositionService.create(createCompaniesToPositionDto);
  }

  @Get()
  findAll() {
    return this.companiesToPositionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesToPositionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompaniesToPositionDto: UpdateCompaniesToPositionDto) {
    return this.companiesToPositionService.update(+id, updateCompaniesToPositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesToPositionService.remove(+id);
  }
}
