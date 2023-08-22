import { IsString, IsNumber, IsNotEmpty, IsArray } from 'class-validator';

export class JobProfileDto {
  @IsNumber()
  @IsNotEmpty()
  level: number;

  @IsNotEmpty()
  @IsString()
  others: string;

  @IsNotEmpty()
  @IsNumber()
  idProgrammingLanguage: number;

  @IsNotEmpty()
  @IsNumber()
  idFrameworksOrDatabase: number;

  @IsNumber()
  @IsNotEmpty()
  idTools: number;
  
  @IsNotEmpty()
  @IsNumber()
  idUserProfile: number;
}
