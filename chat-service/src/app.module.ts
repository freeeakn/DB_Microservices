import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo:27017/chatdb'), ChatModule],
})
export class AppModule {}
