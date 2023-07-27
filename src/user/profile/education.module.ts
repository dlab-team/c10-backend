import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { AuthService } from 'src/Auth/auth.service';
import { JwtStrategy } from 'src/Auth/strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [EducationController],
  providers: [EducationService]
})
export class EducationModule {
  
}
