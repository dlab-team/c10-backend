import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EducationDto } from './dto';
import { Request } from 'express';

@Injectable()
export class EducationService {
    constructor(private prisma: PrismaService){}

    async addEducation(req: Request, data: EducationDto){
        const user = req.user as {sub: number, email: string, };

        try{
            const max_education = await this.prisma.education_received.count({
                where: {
                    user_profile: {
                        id_user: user.sub
                    }
                }
            });

            if(max_education > 2){
                throw new Error('Max education reached');
            }else{
                const profile = await this.prisma.user_profile.update({
                    where: {
                        id_user: user.sub
                    },
                    data: {
                        highest_edu_level: data.highest_edu_level,
                        english_level: data.english_level,
                        current_edu_status: data.current_edu_status
                    }
                });
                await this.prisma.education_received.createMany({
                    data: [
                        {career: data.career_1,
                        name_institution: data.name_institution_1,
                        type_institution: data.type_institution_1,
                        id_user_profile: profile.id},
                        {career: data.career_2,
                        name_institution: data.name_institution_2,
                        type_institution: data.type_institution_2,
                        id_user_profile: profile.id}
                    ]
                });
            }
            return {message: 'Education added successfully'};
        }catch(error){
            console.log(error);
        }
    }
}
