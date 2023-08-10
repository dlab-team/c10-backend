import { Controller, Post, Body } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

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
}
