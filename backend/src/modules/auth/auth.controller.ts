import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SSOLoginDto } from './dto/sso-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const userPayload = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return this.authService.login(userPayload);
  }

  @Post('sso')
  @HttpCode(HttpStatus.OK)
  async ssoLogin(@Body() ssoLoginDto: SSOLoginDto) {
    return this.authService.validateSSOUser(
      ssoLoginDto.ssoId,
      ssoLoginDto.email,
      ssoLoginDto.name,
    );
  }
}
