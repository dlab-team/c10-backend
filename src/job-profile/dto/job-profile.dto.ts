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

  @IsArray()
  @IsOptional()
  idProgrammingLanguage:  Array<number>;

  @IsArray()
  @IsOptional()
  idFrameworksOrDatabase:  Array<number>;

  @IsArray()
  @IsOptional()
  idTools:  Array<number>;

  @IsNumber()
  @IsNotEmpty()
  idUserProfile: number;

 
}
