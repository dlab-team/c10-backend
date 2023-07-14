import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config/dist';
import { Prisma, user } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const createdUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          user_role: {
            connect: {
              id: 1,
            },
          },
          last_name: dto.last_name,
          first_name: dto.first_name,
          user_profile: dto.user_profile,
        },
      });

      return this.signToken(createdUser.id, createdUser.email);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Duplicate Credentials');
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    //find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //if user does not exist throw exception
    if (!user) throw new ForbiddenException('Incorrect Information');
    //compare the psw
    const pwMatches = await argon.verify(user.password, dto.password);
    //if psw is incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Incorrect Information');
    //send back the user
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30min',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
