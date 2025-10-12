import { IsEmail, IsString } from 'class-validator';

export class SSOLoginDto {
  @IsString()
  ssoId: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
