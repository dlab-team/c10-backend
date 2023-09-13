import { Controller, Get, Post, Body,  Req } from '@nestjs/common';
import { JobProfileService } from './job-profile.service';
import { JobProfileDto } from './dto';

@Controller('job')
export class JobProfileController {
  constructor(private jobProfileService: JobProfileService) {}

  @Get('frameworks')
  getFrameworksProfile() {
    return this.jobProfileService.getFrameworksProfile();
  }
  @Get('lenguajes')
  getLenaguajesProfile() {
    return this.jobProfileService.getLenaguajesProfile();
  }
  @Get('tools')
  getToolsProfile() {
    return this.jobProfileService.getToolsProfile();
  }

  @Get('status')
  getJobStatus() {
    return this.jobProfileService.getJobStatus();
  }

  @Get('position')
  getJobPosition() {
    return this.jobProfileService.getJobPosition();
  }

  @Post('profile')
  postJobProfile(@Req() req, @Body() dto: JobProfileDto) {
    return this.jobProfileService.createJobProfile(req,dto);
  }
}
