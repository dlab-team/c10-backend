import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(9, 9, { message: 'Phone number must be a 9-digit number' })
  phone_number: string;

  @IsNotEmpty()
  company_name: string;

  questions: string | null;
}
