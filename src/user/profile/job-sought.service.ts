import { Body, HttpStatus, Injectable, NotFoundException, Req } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DecodedTokenDto } from '../dto';
import { JobSoughtDto } from './dto';
import { profile } from 'console';

@Injectable()
export class JobSoughtService {
  constructor(private prisma: PrismaService) {}

  async addJobSought(@Req() req, @Body() data: JobSoughtDto) {
    const user = req.user as DecodedTokenDto;

    try {
      const user_profile = await this.prisma.user_profile.findUnique({
        where: { id_user: user.id },
      });

      if (data.work_expectation !== undefined || data.id_better_current_situation !== undefined) {
        await this.prisma.user_profile.update({
          where: {
            id_user: user.id
          },
          data: {
            work_expectation: data.work_expectation,
            id_better_current_situation: data.id_better_current_situation,
          }
        });
      }
            
      if (data.id_availability !== undefined && data.id_availability.length > 0) {
        for (const id_availability of data.id_availability) {
          await this.prisma.profile_to_availability.create({
            data: {
              id_user_profile: user_profile.id,
              id_availability: id_availability
            }
          });
        }
      }

      if (data.id_active_visa !== undefined && data.id_active_visa.length > 0) {
        for (const id_active_visa of data.id_active_visa) {
          await this.prisma.profile_active_visa.create({
            data: {
              id_user_profile: user_profile.id,
              id_active_visa: id_active_visa
            }
          });
        }
      }

      const status = Object.keys(data).length === 0 ? HttpStatus.OK : HttpStatus.CREATED;
      const message = Object.keys(data).length === 0 ? 'Job sought Empy' : 'Job sought added successfully';

      return {
        statusCode: status,
        message: message
      };
    }
    catch (error) {
      if (error.code === 'P2025') {
        console.log(`user with id ${user.id} error : ${error.meta.cause} : Error : ${error.code}`);
        throw new NotFoundException('User Profile not found');
      } else if (error.code === 'P2003') {
        console.log(`Error : ${error.code} : Foreign key constraint failed :  ${error.meta.field_name}}`)
        throw new NotFoundException(`Value not found : Database Error`);
      }
      throw new Error(error);
    }
  }

  async GetJobSoughtUIData() {
    try {
      const availability_data = await this.prisma.availability.findMany();
      const active_visa_data = await this.prisma.active_visa.findMany();
      const better_current_situation_data = await this.prisma.better_current_situation.findMany();

      return {
        availability_data: availability_data,
        active_visa_data: active_visa_data,
        better_current_situation_data: better_current_situation_data
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getJobSought(@Req() req) {
    const user = req.user as DecodedTokenDto;

    try {
      return await this.getJobSoughtData(user.id);
    } catch (error) {
      if (error.code === "P2025") {
        console.log(`error : ${error.meta.cause} : Error : ${error.code}`);
        throw new NotFoundException("User Profile not found");
      } else if (error.code === "P2003") {
        console.log(`Error : ${error.code} : Foreign key constraint failed :  ${error.meta.field_name}}`)
        throw new NotFoundException(`Value not found : Database Error`);
      }
      throw new Error(error);
    }
  }

  async getJobSoughtById(id: number) {
    try {
      return await this.getJobSoughtData(id);
    } catch (error) {
      if (error.code === "P2025") {
        console.log(`error : ${error.meta.cause} : Error : ${error.code}`);
        throw new NotFoundException("User Profile not found");
      } else if (error.code === "P2003") {
        console.log(`Error : ${error.code} : Foreign key constraint failed :  ${error.meta.field_name}}`)
        throw new NotFoundException(`Value not found : Database Error`);
      }
      throw new Error(error);
    }
  }

  async getJobSoughtData(userId: number) {
    const profile = await this.prisma.user_profile.findFirst({
      where: {
        id_user: userId,
      },
      include: {
        better_current_situation: {
          select: {
            situation: true,
          },
        },
        profile_to_availability: {
          select: {
            availability: true,
          },
        },
        profile_active_visa: {
          select: {
            active_visa: true,
          },
        },
      },
    });

    return {
      statusCode: HttpStatus.ACCEPTED,
      request: profile,
    };
  }
}
