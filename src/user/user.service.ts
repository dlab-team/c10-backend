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
    delete user.hash;
    return user;
  }

  async getUsers() {
    const users = await this.prisma.user.findMany();
    return users.map(({ hash, ...rest }) => rest);
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    const { hash, ...userWithoutHash } = user;

    return userWithoutHash;
  }

  async editUserById(id: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: dto,
    });

    delete user.hash;
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
