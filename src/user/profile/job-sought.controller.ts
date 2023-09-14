import { Body, Controller, Get, Post, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../Auth/guard/jwt.guard';
import { JobSoughtService } from './job-sought.service';
import { JobSoughtDto } from './dto';

@UseGuards(JwtGuard)
@Controller('profile/job-sought')
export class JobSoughtController {
  constructor(private jobService: JobSoughtService) {}

  @Post('addJobSought')
  addJobSought(@Req() req, @Body() data: JobSoughtDto) {
    return this.jobService.addJobSought(req, data);
  }

  @Get('GetJobSoughtUIData')
  GetJobSoughtUIData() {
    return this.jobService.GetJobSoughtUIData();
  }

  @Get("GetJobSought")
  getJobSought(@Req() req) {
    return this.jobService.getJobSought(req);
  }

  @Get("GetJobSought/:id")
  getJobSoughtById(@Param("id", ParseIntPipe) id: number) {
    return this.jobService.getJobSoughtById(id);
  }
}
