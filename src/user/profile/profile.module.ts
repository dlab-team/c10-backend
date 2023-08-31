import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { DecodedTokenMiddleware } from '../../middleware/user.middleware';
import { JwtService } from '@nestjs/jwt';
import { JobSoughtController } from './job-sought.controller';
import { JobSoughtService } from './job-sought.service';

@Module({
  imports: [],
  controllers: [EducationController, JobSoughtController],
  providers: [EducationService, JwtService, JobSoughtService]
})
export class ProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecodedTokenMiddleware)
      .forRoutes(
        { path: '/profile/education/addEducation', method: RequestMethod.POST },
        { path: '/profile/job-sought/addJobSought', method: RequestMethod.POST },
      );
  };
}
