import { IsNotEmpty, Length } from 'class-validator';
export class CreateUserProfileDto {
  @IsNotEmpty()
  @Length(9, 9, { message: 'Phone number must be a 9-digit number' })
  phone_number: string;
  city: string;
  country: string;
  genre: string;
  highest_edu_level: string | null;
  current_edu_status: string | null;
  english_level: string | null;
  url_cv: string | null;
  url_linkedin: string | null;
  url_github: string | null;
  url_portfolio: string | null;
  preferred_project: string | null;
  work_expectation: string | null;
  id_current_job_status: number;
  id_user: number;
  id_years_experience: number | null;
  id_better_current_situation: number | null;
}
