import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EducationDto } from './dto';
import { Request } from 'express';
import { DecodedTokenDto } from '../dto';

@Injectable()
export class EducationService {
  constructor(private prisma: PrismaService) {}

  async addEducation(req: Request, data: EducationDto) {
    const user = req.user as DecodedTokenDto;


    try {
      const profile = await this.prisma.user_profile.update({
        where: {
          id_user: user.id
        },
        data: {
          highest_edu_level: data.highest_edu_level,
          english_level: data.english_level,
          current_edu_status: data.current_edu_status,
        },
      });

      await this.prisma.education_received.createMany({
        data: [
          {
            career: data.career_1,
            name_institution: data.name_institution_1,
            type_institution: data.type_institution_1,
            id_user_profile: profile.id
          },
          {
            career: data.career_2,
            name_institution: data.name_institution_2,
            type_institution: data.type_institution_2,
            id_user_profile: profile.id
          }
        ]
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Education added successfully'
      };
    } catch (error) {
      if (error.code === 'P2025') {
        console.log(`user with id ${user.id} error : ${error.meta.cause}`);
        throw new NotFoundException('User not found');
      }
      throw new Error(error);
    }
  }

  async getEducation(req: Request) {
    const user = req.user as DecodedTokenDto;

    try {
      return await this.getEducationData(user.id);
    } catch (error) {
      if (error.code === "P2025") {
        console.log(`user with id ${user.id} error : ${error.meta.cause}`);
        throw new NotFoundException("Data not found");
      }
      throw new Error(error);
    }
  }

  async getEducationById(id: number) {
    try {
      return await this.getEducationData(id);
    } catch (error) {
      if (error.code === "P2025") {
        console.log(`error : ${error.meta.cause}`);
        throw new NotFoundException("Data not found");
      } else if (error instanceof TypeError) {
        throw new NotFoundException("Data not found");
      }
      throw new Error(error);
    }
  }

  async getEducationData(userId: number) {
    const profile = await this.prisma.user_profile.findFirst({
      where: {
        id_user: userId,
      },
    });

    const education = await this.prisma.education_received.findFirst({
      where: {
        id_user_profile: profile.id,
      },
    });

    const data = {
      highest_edu_level: profile.highest_edu_level,
      english_level: profile.english_level,
      current_edu_status: profile.current_edu_status,
      ...education,
    };

    return {
      statusCode: HttpStatus.ACCEPTED,
      request: data,
    };
  }
}
