import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('register')
  create(@Payload() createAuthDto: CreateAuthDto) {
    return this.authService.register(
      createAuthDto.username,
      createAuthDto.password,
    );
  }

  @MessagePattern('login')
  create(@Payload() createAuthDto: CreateAuthDto) {
    return this.authService.login(
      createAuthDto.username,
      createAuthDto.password,
    );
  }
}
