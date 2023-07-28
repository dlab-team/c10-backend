import { Controller, Get, Post,Body } from '@nestjs/common';
import { JobProfileService } from './job-profile.service';
import { JobProfileDto } from './dto';

@Controller('jobprofile')
export class JobProfileController {
  constructor(private jobProfileService: JobProfileService) {}

  @Get()
  getJobProfile() {
    return this.jobProfileService.getJobProfile();
  }

  @Post('profile')
  postJobProfile(@Body() dto: JobProfileDto) {
    return this.jobProfileService.createJobProfile(dto);
  }
}
