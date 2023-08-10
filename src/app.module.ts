import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CompaniesModule } from './companies/companies.module';
import { CompaniesToPositionModule } from './companies_to_position/companies_to_position.module';
import { JobProfileModule } from './job-profile/job-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    CompaniesModule,
    CompaniesToPositionModule,
    JobProfileModule,
  ],
})
export class AppModule {}
