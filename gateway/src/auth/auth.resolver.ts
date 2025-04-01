import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User, RegisterInput, LoginInput, LoginResponse } from './auth.types';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async register(@Args('input') input: RegisterInput): Promise<User> {
    return this.authService.register(input);
  }

  @Mutation(() => LoginResponse)
  async login(@Args('input') input: LoginInput): Promise<LoginResponse> {
    return this.authService.login(input);
  }

  @Query(() => String)
  async protected(@Args('token') token: string): Promise<string> {
    return this.authService.protectedRoute(token);
  }
}
