import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompaniesController } from './companies.controller';

@Module({
  controllers: [CompaniesController],
  providers: [PrismaService]
})
export class CompaniesModule {}
