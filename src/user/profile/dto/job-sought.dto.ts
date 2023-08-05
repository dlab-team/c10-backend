import { IsNumber, IsOptional, IsString, IsArray } from 'class-validator';

export class JobSoughtDto {
    @IsString()
    @IsOptional()
    work_expectation: string;

    @IsArray()
    @IsOptional()
    id_availability: Array<number>;

    @IsNumber()
    @IsOptional()
    id_better_current_situation: number;

    @IsArray()
    @IsOptional()
    id_active_visa: Array<number>;
}