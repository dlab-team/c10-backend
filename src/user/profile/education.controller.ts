import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { EducationService } from './education.service';
import { JwtGuard } from '../../Auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('profile/education')
export class EducationController {
    constructor(private education: EducationService){}

    @Post('addEducation')
    addEducation(@Req() req ,@Body() data){
        return this.education.addEducation(req, data);
    }
}
