import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { user } from '@prisma/client';
import { GetUser } from '../Auth/decorator';
import { JwtGuard } from '../Auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: user) {
    return user;
  }

  @Patch()
  editUser(@GetUser() userId: { id: number }, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  editUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUserById(id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUserById(id);
    return { msg: 'User deleted' };
  }
}
