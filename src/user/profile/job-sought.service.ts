import { Body, HttpStatus, Injectable, NotFoundException, Req } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DecodedTokenDto } from '../dto';
import { JobSoughtDto } from './dto';

@Injectable()
export class JobSoughtService {
    constructor(private prisma: PrismaService) { }

    async addJobSought(@Req() req, @Body() data: JobSoughtDto) {
        const user = req.user as DecodedTokenDto;

        try {
            const user_profile = await this.prisma.user_profile.update({
                where: {
                    id_user: user.id
                },
                data: {
                    work_expectation: data.work_expectation,
                    id_better_current_situation: data.id_better_current_situation,
                }
            });

            for (const id_availability of data.id_availability){
                await this.prisma.profile_to_availability.create({
                    data: {
                        id_user_profile: user_profile.id,
                        id_availability: id_availability
                    }
                });
            }

            for (const id_active_visa of data.id_active_visa) {
                await this.prisma.profile_active_visa.create({
                    data: {
                        id_user_profile: user_profile.id,
                        id_active_visa: id_active_visa
                    }
                });
            }

            return {
                statusCode: HttpStatus.CREATED,
                message: 'Education added successfully'
            };
        }
        catch (error) {
            if (error.code === 'P2025') {
                console.log(`user with id ${user.id} error : ${error.meta.cause} : Error : ${error.code}`);
                throw new NotFoundException('User Profile not found');
            } else if (error.code === 'P2003') {
                console.log(`Error : ${error.code} : Foreign key constraint failed :  ${error.meta.field_name}}`)
                throw new NotFoundException(`Value not found : Internal Error`);
            }
            
        }
    }
}
