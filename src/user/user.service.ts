import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: { id: number }, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId.id,
      },
      data: {
        ...dto,
      },
    });
    delete user.password;
    return user;
  }

  async getUsers() {
    const users = await this.prisma.user.findMany();
    return users.map(({ password, ...rest }) => rest);
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    const { password, ...userWithoutHash } = user;

    return userWithoutHash;
  }

  async editUserById(id: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: dto,
    });

    delete user.password;
    return user;
  }

  async deleteUserById(id: number) {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
