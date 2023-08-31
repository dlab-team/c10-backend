import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { JobProfileController } from "./job-profile.controller";
import { JobProfileService } from "./job-profile.service";
import { JwtService } from "@nestjs/jwt";
import { DecodedTokenMiddleware } from "src/middleware/user.middleware";

@Module({
  controllers: [JobProfileController],
  providers: [JobProfileService, JwtService],
})
export class JobProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecodedTokenMiddleware)
      .forRoutes({ path: "/job/profile/", method: RequestMethod.POST });
  }
}
