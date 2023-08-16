import { IsNotEmpty, Length, IsOptional, IsInt } from 'class-validator';
export class CreateUserProfileDto {
  @IsNotEmpty()
  @Length(9, 9, { message: 'Phone number must be a 9-digit number' })
  phone_number: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  genre: string;

  @IsOptional()
  highest_edu_level: string | null;

  @IsOptional()
  current_edu_status: string | null;

  @IsOptional()
  english_level: string | null;

  @IsOptional()
  url_cv: string | null;

  @IsOptional()
  url_linkedin: string | null;

  @IsOptional()
  url_github: string | null;

  @IsOptional()
  url_portfolio: string | null;

  @IsOptional()
  preferred_project: string | null;

  @IsOptional()
  work_expectation: string | null;

  @IsNotEmpty()
  id_current_job_status: number;

  @IsNotEmpty()
  id_user: number;

  @IsOptional()
  @IsInt()
  id_years_experience: number | null;

  @IsOptional()
  @IsInt()
  id_better_current_situation: number | null;
}
