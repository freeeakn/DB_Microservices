import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto, SendMessageDto } from './chat.dto';
import { Chat, Message } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async createChat(createChatDto: CreateChatDto) {
    const { participants } = createChatDto;
    if (participants.length < 2) {
      throw new BadRequestException('At least two participants are required');
    }

    const existingChat = await this.chatModel.findOne({
      participants: { $all: participants, $size: participants.length },
    });
    if (existingChat) {
      throw new BadRequestException('Chat already exists');
    }

    const chat = new this.chatModel({ participants });
    return chat.save();
  }

  async sendMessage(sendMessageDto: SendMessageDto) {
    const { chatId, sender, text } = sendMessageDto;
    const chat = await this.chatModel.findById(chatId);
    if (!chat) {
      throw new BadRequestException('Chat not found');
    }

    if (!chat.participants.includes(sender)) {
      throw new BadRequestException('Sender is not a participant');
    }

    const message: Message = { text, sender, timestamp: new Date() };
    chat.messages.push(message);
    await chat.save();
    return message;
  }

  async getChats(data: { participantId: string }) {
    const { participantId } = data;
    return this.chatModel.find({ participants: participantId }).exec();
  }
}
