export class CreateChatDto {
  participants: string[];
}

export class SendMessageDto {
  chatId: string;
  sender: string;
  text: string;
}
