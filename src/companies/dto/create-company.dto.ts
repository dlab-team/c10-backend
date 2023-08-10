import { IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone_number: string;

  @IsNotEmpty()
  company_name: string;

  questions: string;
}
