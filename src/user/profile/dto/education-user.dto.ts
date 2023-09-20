import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class EducationDto {
  @IsNotEmpty()
  @IsString()
  highest_edu_level: string;

  @IsNotEmpty()
  @IsString()
  career_1: string;

  @IsNotEmpty()
  @IsString()
  name_institution_1: string;

  @IsNotEmpty()
  @IsString()
  type_institution_1: string;

  @IsString()
  @IsOptional()
  career_2: string;

  @IsString()
  @IsOptional()
  name_institution_2: string;

  @IsString()
  @IsOptional()
  type_institution_2: string;

  @IsString()
  @IsOptional()
  current_edu_status: string;

  @IsString()
  @IsOptional()
  english_level: string;
}
