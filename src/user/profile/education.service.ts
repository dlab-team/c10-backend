import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EducationDto } from './dto';

@Injectable()
export class EducationService {
    constructor(private prisma: PrismaService){}

    addEducation(userEmail: {email: string}, data: EducationDto){
        
    }
}
