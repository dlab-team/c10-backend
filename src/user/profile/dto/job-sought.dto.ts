import { IsNumber, IsOptional, IsString } from 'class-validator';

export class JobSoughtDto {
    @IsString()
    @IsOptional()
    work_expectation: string;

    @IsNumber()
    @IsOptional()
    id_availability: number;

    @IsNumber()
    @IsOptional()
    id_better_current_situation: number;

    @IsNumber()
    @IsOptional()
    id_active_visa: number
}