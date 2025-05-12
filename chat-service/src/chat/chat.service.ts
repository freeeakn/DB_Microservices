import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async createChat(participants: string[]): Promise<Chat> {
    const chat = new this.chatModel({ participants, messages: [] });
    return chat.save();
  }

  async sendMessage(
    chatId: string,
    text: string,
    sender: string,
  ): Promise<Chat> {
    try {
      const chat = await this.chatModel.findById(chatId);
      if (!chat) throw new NotFoundException('Chat with this id nor found');
      chat.messages.push({ text, sender, timestamp: new Date() });
      return chat.save();
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return e;
    }
  }

  async getMessages(chatId: string) {
    try {
      const chat = await this.chatModel.findById(chatId);
      if (!chat) throw new NotFoundException('Chat with this id nor found');
      return chat.messages;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return e;
    }
  }
}
