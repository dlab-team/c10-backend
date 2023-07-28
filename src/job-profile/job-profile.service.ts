import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobProfileDto } from './dto';

@Injectable()
export class JobProfileService {
  constructor(private prisma: PrismaService) {}

  async getJobProfile() {
    const users = await this.prisma.technology_expertise.findMany();
    return users.map(({ ...rest }) => rest);
  }

  async createJobProfile(dto: JobProfileDto) {
    try {
      const technologyExpertise = await this.prisma.technology_expertise.create(
        {
          data: {
            level: dto.level,
            others: dto.others,
            id_programming_language: 1,
            id_frameworks_or_batabase: 1,
            id_tools: 1,
            id_user_profile: 1,
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
