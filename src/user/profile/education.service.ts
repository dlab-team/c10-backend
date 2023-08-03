import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EducationDto } from './dto';
import { Request } from 'express';

@Injectable()
export class EducationService {
    constructor(private prisma: PrismaService) { }

    async addEducation(req: Request, data: EducationDto) {
        const user = req.user as {
            id: number,
            first_name: string,
            last_name: string,
            email: string,
            id_user_role: number
        };

        try {
            const profile = await this.prisma.user_profile.update({
                where: {
                    id_user: user.id
                },
                data: {
                    highest_edu_level: data.highest_edu_level,
                    english_level: data.english_level,
                    current_edu_status: data.current_edu_status
                }
            });

            await this.prisma.education_received.createMany({
                data: [
                    {
                        career: data.career_1,
                        name_institution: data.name_institution_1,
                        type_institution: data.type_institution_1,
                        id_user_profile: profile.id
                    },
                    {
                        career: data.career_2,
                        name_institution: data.name_institution_2,
                        type_institution: data.type_institution_2,
                        id_user_profile: profile.id
                    }
                ]
            });
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Education added successfully'
            };
        } catch (error) {
            if (error.code === 'P2025') {
                console.log(`user with id ${user.id} error : ${error.meta.cause}`);
                throw new NotFoundException('User not found');
            }
            throw new Error(error);
        }
    }
}