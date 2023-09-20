import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserProfileDto } from './dto/create-user_profile.dto';
import { UpdateUserProfileDto } from './dto/update-user_profile.dto';
import { Request } from 'express';

@Injectable()
export class UserProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(req: Request, createUserProfileDto: CreateUserProfileDto) {
    const userProfileInput = {
      phone_number: createUserProfileDto.phone_number,
      city: createUserProfileDto.city,
      country: createUserProfileDto.country,
      genre: createUserProfileDto.genre,
      highest_edu_level: createUserProfileDto.highest_edu_level,
      current_edu_status: createUserProfileDto.current_edu_status,
      english_level: createUserProfileDto.english_level,
      url_cv: createUserProfileDto.url_cv,
      url_linkedin: createUserProfileDto.url_linkedin,
      url_github: createUserProfileDto.url_github,
      url_portfolio: createUserProfileDto.url_portfolio,
      preferred_project: createUserProfileDto.preferred_project,
      work_expectation: createUserProfileDto.work_expectation,
      id_user: createUserProfileDto.id_user,
      id_current_job_status: createUserProfileDto.id_current_job_status,
      id_years_experience: createUserProfileDto.id_years_experience,
      id_better_current_situation:
        createUserProfileDto.id_better_current_situation,
    };

    await this.prisma.user_profile.create({
      data: userProfileInput,
    });
  }

  findAll() {
    return this.prisma.user_profile.findMany();
  }

  findOne(id: number) {
    return this.prisma.user_profile.findFirst({
      where: { id: +id },
    });
  }

  update(id: number, updateUserProfileDto: UpdateUserProfileDto) {
    return this.prisma.user_profile.update({
      where: { id: +id },
      data: updateUserProfileDto,
    });
  }

  remove(id: number) {
    return this.prisma.companies.delete({
      where: { id: +id },
    });
  }
}
