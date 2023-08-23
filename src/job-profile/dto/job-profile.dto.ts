import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  IsOptional,
} from 'class-validator';

export class JobProfileDto {
  @IsNumber()
  @IsNotEmpty()
  level: number;

  @IsNotEmpty()
  @IsString()
  others: string;

  @IsNumber()
  @IsNotEmpty()
  idProgrammingLanguage:  number;

 @IsNumber()
  @IsNotEmpty()
  idFrameworksOrDatabase:  number;

 @IsNumber()
  @IsNotEmpty()
  idTools:  number;
}
