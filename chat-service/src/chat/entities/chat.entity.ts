import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  sender: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

@Schema()
export class Chat extends Document {
  @Prop({ type: [String], required: true })
  participants: string[];

  @Prop({ type: [Message], default: [] })
  messages: Message[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export const ChatSchema = SchemaFactory.createForClass(Chat);
