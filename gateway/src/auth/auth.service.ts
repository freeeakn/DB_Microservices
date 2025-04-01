import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { User, LoginResponse } from './auth.types';

@Injectable()
export class AuthService {
  private readonly authUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const authUrl = this.configService.get<string>('authService.url');
    if (!authUrl) {
      throw new Error('AUTH_SERVICE_URL is not defined in configuration');
    }
    this.authUrl = authUrl;
  }

  async register(user: { username: string; password: string }): Promise<User> {
    Logger.log(`Registering user: ${user.username}`, 'AuthService');
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authUrl}/register`, user),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Registration failed',
        error.response?.status || 500,
      );
    }
  }

  async login(credentials: {
    username: string;
    password: string;
  }): Promise<LoginResponse> {
    Logger.log(`Login user: ${credentials.username}`, 'AuthService');
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.authUrl}/login`, credentials),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Login failed',
        error.response?.status || 401,
      );
    }
  }

  async protectedRoute(token: string): Promise<string> {
    try {
      const config: AxiosRequestConfig = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await firstValueFrom(
        this.httpService.get(`${this.authUrl}/protected`, config),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Access denied',
        error.response?.status || 401,
      );
    }
  }
}
