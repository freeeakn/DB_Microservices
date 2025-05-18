import {
  Controller,
  Post,
  Body,
  Inject,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateChatDto, SendMessageDto } from './chat.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('chat')
@UseGuards(AuthGuard('jwt'))
export class ChatController {
  constructor(@Inject('CHAT_SERVICE') private chatService: ClientProxy) {}

  @Post()
  createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.send({ cmd: 'createChat' }, createChatDto);
  }

  @Post('message')
  sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.chatService.send({ cmd: 'sendMessage' }, sendMessageDto);
  }

  @Get(':participantId')
  getChats(@Param('participantId') participantId: string) {
    return this.chatService.send({ cmd: 'getChats' }, { participantId });
  }
}
