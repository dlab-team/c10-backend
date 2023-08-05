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
    better_current_situation: number;

    @IsNumber()
    @IsOptional()
    active_visa: number
}