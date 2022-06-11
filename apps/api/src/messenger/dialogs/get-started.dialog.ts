/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MessengerEventBus } from '../eventBus';
import { BUTTON_TYPE, MessengerEvent } from '../enums';
import { MessengerClient } from 'messaging-api-messenger';
import { InjectMessenger } from '../providers';
import { ACTIONS, FLOWS } from '@App/constants';
import { MessengerWrapper } from '../services';
import { GET_SARTED } from '../data/getStarted';

@Injectable()
export class GetStarted {
  constructor(
    private readonly eventBus: MessengerEventBus,
    @InjectMessenger() private readonly messengerClient: MessengerClient,
    private readonly messengerWrapper: MessengerWrapper,
  ) {
    this.handle();
  }
  handle() {
    this.eventBus
      .ofType(MessengerEvent.POSTBACK, ACTIONS.GET_STARTED)
      .subscribe(async ({ message: msg }) => {
        console.log('get started');
        // greet
        const senderId = msg.sender.id;
        await this.messengerClient.sendText(msg.sender.id, GET_SARTED[0]);
        await this.messengerWrapper.sendTyping(senderId, 3000);
        await this.messengerClient.sendButtonTemplate(senderId, GET_SARTED[1], [
          {
            type: BUTTON_TYPE.POSTBACK,
            title: 'Hacer un pedido',
            payload: FLOWS.START_CREATE_PLATE,
          },
          {
            type: BUTTON_TYPE.POSTBACK,
            title: 'Hablar con asesor',
            payload: FLOWS.START_CONSULTANT,
          },
        ]);

        //
      });
  }
}
