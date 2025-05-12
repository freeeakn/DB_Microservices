import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./.env`,
      isGlobal: true,
    }),
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController],
  exports: [ConfigModule],
})
export class AppModule {}
