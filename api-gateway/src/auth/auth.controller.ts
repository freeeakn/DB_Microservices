import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.send({ cmd: 'register' }, createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.send({ cmd: 'login' }, loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req) {
    return this.authService.send(
      { cmd: 'getProfile' },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      { userId: req.user.id },
    );
  }
}
