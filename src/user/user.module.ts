import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EducationModule } from './profile/education.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [EducationModule]
})
export class UserModule {}
