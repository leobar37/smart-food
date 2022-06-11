/* eslint-disable prettier/prettier */
import { FLOWS } from '@App/constants';
import { Injectable } from '@nestjs/common';
import { MessengerClient } from 'messaging-api-messenger';
import { MessengerEvent } from '../enums';
import { MessengerEventBus } from '../eventBus';
import { InjectMessenger } from '../providers';
import { MessengerWrapper } from '../services';

@Injectable()
export class ConsultanDialog {
  constructor(
    private readonly eventBus: MessengerEventBus,
    @InjectMessenger() private readonly messengerClient: MessengerClient,
    private readonly messengerWrapper: MessengerWrapper,
  ) {
    this.handle();
  }
  handle() {
    this.eventBus
      .ofType(MessengerEvent.POSTBACK, FLOWS.START_CONSULTANT)
      .subscribe(async ({ message: msg }) => {
        // greet
        const senderId = msg.sender.id;
        await this.messengerClient.sendText(
          senderId,
          `Un asesor lo contactará en breve, pueder ir dejando tu duda en el chat, para que nuestro asesor pueda atenderte lo más antes posible.`,
        );
        //
      });
  }
}
