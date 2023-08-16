import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserProfileService } from './user_profile.service';
import { UserProfileController } from './user_profile.controller';
import { DecodedTokenMiddleware } from '../middleware/user.middleware';
import { JwtService } from '@nestjs/jwt';
@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService, JwtService],
})
export class UserProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecodedTokenMiddleware).forRoutes('/user-profile');
  }
}
