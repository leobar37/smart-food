import { Injectable } from '@nestjs/common';
import { InjectMessenger } from '../providers';
import { MessengerClient } from 'messaging-api-messenger';

@Injectable()
export class MessengerClientUtils {
  constructor(@InjectMessenger() readonly client: MessengerClient) {}

  //   chain(userId: number) {}
}
