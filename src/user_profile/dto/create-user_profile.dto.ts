import { IsNotEmpty, Length, IsOptional, IsInt } from 'class-validator';
export class CreateUserProfileDto {
  @IsNotEmpty()
  @Length(9, 9, { message: 'Phone number must be a 9-digit number' })
  phone_number: string;

  @IsNotEmpty()
  @IsOptional()
  city: string;

  @IsNotEmpty()
  @IsOptional()
  country: string;

  @IsNotEmpty()
  @IsOptional()
  genre: string;

  @IsOptional()
  highest_edu_level: string;

  @IsOptional()
  current_edu_status: string;

  @IsOptional()
  english_level: string;

  @IsOptional()
  url_cv: string;

  @IsOptional()
  url_linkedin: string;

  @IsOptional()
  url_github: string;

  @IsOptional()
  url_portfolio: string;

  @IsOptional()
  preferred_project: string;

  @IsOptional()
  work_expectation: string;

  @IsNotEmpty()
  @IsInt()
  id_user: number;

  @IsOptional()
  @IsInt()
  id_current_job_status: number;

  @IsOptional()
  @IsInt()
  id_years_experience: number;

  @IsOptional()
  @IsInt()
  id_better_current_situation: number;
}
