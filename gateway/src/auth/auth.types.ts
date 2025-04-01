import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: number;

  @Field()
  username: string;
}

@InputType()
export class RegisterInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;
}
