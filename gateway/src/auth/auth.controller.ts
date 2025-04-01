import { Controller, Post, Body, Get, Headers, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  async register(@Body() user: RegisterDto) {
    return this.authService.register(user);
  }

  @Post('login')
  async login(@Body() credentials: { username: string; password: string }) {
    return this.authService.login(credentials);
  }

  @Get('protected')
  async protectedRoute(@Headers('authorization') authHeader: string) {
    const token = authHeader?.replace('Bearer ', '');
    return this.authService.protectedRoute(token);
  }
}
