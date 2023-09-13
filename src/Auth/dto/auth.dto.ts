import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
} from "class-validator";
import { UserRoleDto } from "./userRole.dto";
import { UserProfileDto } from "./userProfile.dto";

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsNumber()
  @IsOptional()
  id_user_role?: number;

  @IsOptional()
  @ValidateNested()
  user_role?: UserRoleDto;

  @IsOptional()
  @ValidateNested()
  user_profile?: UserProfileDto;
}
