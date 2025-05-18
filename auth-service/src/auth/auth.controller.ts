import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'register' })
  async register(createUserDto: CreateAuthDto) {
    return this.authService.register(createUserDto);
  }

  @MessagePattern({ cmd: 'login' })
  async login(loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern({ cmd: 'getProfile' })
  async getProfile(data: { userId: string }) {
    return this.authService.getProfile(data.userId);
  }
}
