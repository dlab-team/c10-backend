import { Controller, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../Auth/decorator';
import { JwtGuard } from '../Auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser() user: { id: number }, @Body() dto: EditUserDto) {
    return this.userService.editUser(user, dto);
  }
}
