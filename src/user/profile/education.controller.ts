import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { EducationService } from './education.service';
import { GetUser } from 'src/Auth/decorator';
import { user } from '@prisma/client';
import { JwtGuard } from 'src/Auth/guard/jwt.guard';

@Controller('profile/education')
export class EducationController {
    constructor(private education: EducationService){}

    @UseGuards(JwtGuard)
    @Post('addEducation')
    addEducation(@Req() req ,@Body() data){
        return this.education.addEducation(req, data);
    }
}
