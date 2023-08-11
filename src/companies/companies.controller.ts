import {  Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    const companyInput = {
      first_name: createCompanyDto.first_name,
      last_name: createCompanyDto.last_name,
      email: createCompanyDto.email,
      phone_number: createCompanyDto.phone_number,
      company: createCompanyDto.company_name,
      questions: createCompanyDto.questions,
    };

    return this.prisma.companies.create({
      data: companyInput,
    });
  }
  
  @Get()
  findAll() {
    return this.prisma.companies.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prisma.companies.findFirst({
      where: { id: +id },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.companies.update({
      where: { id: +id },
      data: updateCompanyDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prisma.companies.delete({
      where: { id: +id },
    });
  }
}