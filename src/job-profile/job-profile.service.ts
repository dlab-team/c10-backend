import { Injectable, ForbiddenException, Body, Req } from '@nestjs/common';
import { JobProfileDto } from './dto';
import { PrismaService } from './../prisma/prisma.service';
import { DecodedTokenDto } from 'src/user/dto';

@Injectable()
export class JobProfileService {
  constructor(private prisma: PrismaService) {}

  async getFrameworksProfile() {
    const users = await this.prisma.frameworks_or_batabase.findMany();
    return users.map(({ ...rest }) => rest);
  }
  async getLenaguajesProfile() {
    const users = await this.prisma.programming_language.findMany();
    return users.map(({ ...rest }) => rest);
  }
  async getToolsProfile() {
    const users = await this.prisma.tools.findMany();
    return users.map(({ ...rest }) => rest);
  }

  async createJobProfile( @Req() req, @Body() dto: JobProfileDto) {
    const user = req.user as DecodedTokenDto;
    try {

      const user_profile = await this.prisma.user_profile.findUnique({
        where: { id_user: user.id },
    });
      const technologyExpertise = await this.prisma.technology_expertise.create(
        {
          data: {
            level: dto.level,
            others: dto.others,
            id_programming_language: dto.idProgrammingLanguage,
            id_frameworks_or_batabase: dto.idFrameworksOrDatabase,
            id_tools:dto.idTools,
            id_user_profile: user_profile.id,
          },
        },
      );

     
      
      return technologyExpertise;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('This language already exists');
      }
      throw error;
    }
  }
}
