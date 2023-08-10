import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

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

  @IsNotEmpty()
  @IsNumber()
  idTools: number;
  
  @IsNotEmpty()
  @IsNumber()
  idUserProfile: number;
}
