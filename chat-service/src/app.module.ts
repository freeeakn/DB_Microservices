import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), ChatModule],
})
export class AppModule {}
