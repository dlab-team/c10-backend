import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompaniesToPositionDto } from './dto/create-companies_to_position.dto';
import { UpdateCompaniesToPositionDto } from './dto/update-companies_to_position.dto';

@Controller('companies-to-position')
export class CompaniesToPositionController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async create(@Body() createDto: CreateCompaniesToPositionDto) {
    return this.prisma.companies_to_position.create({
      data: createDto,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateCompaniesToPositionDto,
  ) {
    return this.prisma.companies_to_position.update({
      where: { id },
      data: updateDto,
    });
  }
}
