import { Body, Injectable, Req } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DecodedTokenDto } from '../dto';

@Injectable()
export class JobSoughtService {
    constructor(private prisma: PrismaService) { }

    async addJobSought(@Req() req, @Body() data) {
        const user = req.user as DecodedTokenDto;

        try {
            await this.prisma.user_profile.update({
                where: {
                    id_user: user.id
                },
                data: {
                    work_expectation: ''
                }
            });
        }
        catch (error) {

            throw new Error(error);
        }
    }
}
