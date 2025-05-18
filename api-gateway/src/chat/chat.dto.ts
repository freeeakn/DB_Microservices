import { IsString, IsArray } from 'class-validator';

export class CreateChatDto {
  @IsArray()
  @IsString({ each: true })
  participants: string[];
}

export class SendMessageDto {
  @IsString()
  chatId: string;

  @IsString()
  sender: string;

  @IsString()
  text: string;
}
