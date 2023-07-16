import { Body, Controller, Post } from '@nestjs/common';
import { EducationService } from './education.service';
import { GetUser } from 'src/Auth/decorator';
import { user } from '@prisma/client';

@Controller('users/education')
export class EducationController {
    constructor(private education: EducationService){}

    @Post()
    addEducation(@GetUser() userEmail: { email: string } ,@Body() data){
        return this.education.addEducation(userEmail, data);
    }
}
