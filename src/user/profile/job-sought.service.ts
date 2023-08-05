import { Body, Injectable, NotFoundException, Req } from '@nestjs/common';
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

            await this.prisma.profile_to_availability.create({
                data: {
                    id_user_profile: user_profile.id,
                    id_availability: data.id_availability
                }
            });

            await this.prisma.profile_active_visa.create({
                data: {
                    id_user_profile: user_profile.id,
                    id_active_visa: data.id_active_visa
                }
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                console.log(`user with id ${user.id} error : ${error.meta.cause}`);
                throw new NotFoundException('User Profile not found');
            }
            throw new Error(`Error: ${error} - ${error.code} - ${error.message}`);
        }
    }
}
