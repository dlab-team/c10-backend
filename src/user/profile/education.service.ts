import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EducationDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist';
import { Request } from 'express';

@Injectable()
export class EducationService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService){}

    async addEducation(req: Request, data: EducationDto){
        const token = req.headers.authorization.split(' ')[1];
        
        const user = await this.getUserByToken(token);
        
        try{
            const max_education = await this.prisma.education_received.count({
                where: {
                    user_profile: {
                        id_user: user.sub
                    }
                }
            });

            console.log(user);

            if(max_education > 2){
                throw 1;
            }else{
                const education_extra = await this.prisma.user_profile.update({
                    where: {
                        id: user.sub
                    },
                    data: {
                        highest_edu_level: data.highest_edu_level,
                        english_level: data.english_level,
                        current_edu_status: data.current_edu_status
                    }
                });
                const education = await this.prisma.education_received.createMany({
                    data: [
                        {career: data.career_1,
                        name_institution: data.name_institution_1,
                        type_institution: data.type_institution_1,
                        id_user_profile: user.sub},
                        {career: data.career_2,
                        name_institution: data.name_institution_2,
                        type_institution: data.type_institution_2,
                        id_user_profile: user.sub}
                    ]
                });
                return {
                    education_extra,
                    education
                }
            }
        }catch(error){
            console.log(error);
            if(error ===1){
                throw new ForbiddenException('Max education reached')
            }
        }
    }

    async getUserByToken(token: string){
        const secret = this.config.get('JWT_SECRET');
        const decoded = this.jwt.verifyAsync(token, { secret });

        const user = decoded;
        return user;
    }
}
