import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { DecodedTokenMiddleware } from '../../middleware/user.middleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [EducationController],
  providers: [EducationService, JwtService],
})
export class ProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecodedTokenMiddleware)
      .forRoutes('/profile/education/addEducation');
  }
}
