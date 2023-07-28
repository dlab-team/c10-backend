import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { AuthService } from 'src/Auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { DecodedTokenMiddleware } from 'src/middleware/user.middleware';

@Module({
  imports: [JwtModule.register({})],
  controllers: [EducationController],
  providers: [EducationService, AuthService]
})
export class EducationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(DecodedTokenMiddleware)
    .forRoutes('/profile/education/addEducation');
  };
}
