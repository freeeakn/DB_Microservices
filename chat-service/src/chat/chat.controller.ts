import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { CreateChatDto, SendMessageDto } from './chat.dto';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @MessagePattern({ cmd: 'createChat' })
  async createChat(createChatDto: CreateChatDto) {
    return this.chatService.createChat(createChatDto);
  }

  @MessagePattern({ cmd: 'sendMessage' })
  async sendMessage(sendMessageDto: SendMessageDto) {
    return this.chatService.sendMessage(sendMessageDto);
  }

  @MessagePattern({ cmd: 'getChats' })
  async getChats(data: { participantId: string }) {
    return this.chatService.getChats(data);
  }
}
