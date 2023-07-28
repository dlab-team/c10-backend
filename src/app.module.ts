import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JobProfileModule } from './job-profile/job-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    JobProfileModule,
  ],
})
export class AppModule {}
