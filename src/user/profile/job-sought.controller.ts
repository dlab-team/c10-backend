import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../Auth/guard/jwt.guard';
import { JobSoughtService } from './job-sought.service';

@UseGuards(JwtGuard)
@Controller('profile/job-sought')
export class JobSoughtController {
    constructor(private jobService: JobSoughtService){}

    @Post('addJobSought')
    name(@Req() req, @Body() data) {
        
    }
}
