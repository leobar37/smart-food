/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MessengerEventBus } from '../eventBus';
import { MessengerEvent } from '../enums';
import { MessengerClient } from 'messaging-api-messenger';
import { InjectMessenger } from '../../common/providers';
import { sleep } from '@smartfood/common';
@Injectable()
export class Ping {
  constructor(
    private readonly eventBus: MessengerEventBus,
    @InjectMessenger() private readonly messengerClient: MessengerClient,
  ) {
    this.pong();
  }
  pong() {
    this.eventBus
      .ofType(MessengerEvent.MESSAGE)
      .subscribe(async ({ message: msg }) => {
        const text = msg.message.text;
        if (text === 'ping') {
          await this.messengerClient.typingOn(msg.sender.id);
          await sleep(2000);
          await this.messengerClient.typingOff(msg.sender.id);
          await this.messengerClient.sendText(msg.sender.id, 'pong');
        }
      });
  }
}
