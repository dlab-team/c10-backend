import { IsString, IsNumber } from 'class-validator';

export class JobProfileDto {
  @IsNumber()
  level: number;

  @IsString()
  others: string;

  @IsNumber()
  idProgrammingLanguage: number;

  @IsNumber()
  idFrameworksOrDatabase: number;

  @IsNumber()
  idTools: number;

  @IsNumber()
  idUserProfile: number;
}
