/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MessengerEventBus } from '../eventBus';
import { MessengerEvent } from '../enums';
import { MessengerClient } from 'messaging-api-messenger';
import { InjectMessenger } from '../../common/providers';
import { ACTIONS } from '../actions';
import { FLOWS } from '../flows';

import { BUTTON_TYPE } from '../enums';
import { WORD_TO_ACTIVETE_MENU } from '../../common/data';

@Injectable()
export class MenuDialog {
  constructor(
    private readonly eventBus: MessengerEventBus,
    @InjectMessenger() private readonly messengerClient: MessengerClient,
  ) {
    this.handleMenu();
  }
  handleMenu() {
    //http://m.me/SmartFoodHD?ref=MENU
    this.eventBus
      .ofType(MessengerEvent.REFERRAL, ACTIONS.SHOW_MENU)
      .subscribe(async ({ message: msg }) => {
        const senderId = msg.sender.id;
        await this.sendMenu(senderId);
      });

    this.eventBus
      .toMatchWords(WORD_TO_ACTIVETE_MENU, {
        caseSensitive: false,
        exact: false,
      })
      .subscribe(async ({ message: msg }) => {
        const userId = msg.sender.id;
        await this.sendMenu(userId);
      });

    this.eventBus
      .ofType(MessengerEvent.POSTBACK, ACTIONS.SHOW_MENU)
      .subscribe(async ({ message: msg }) => {
        const userId = msg.sender.id;
        await this.sendMenu(userId);
      });
  }

  async sendMenu(userId: string) {
    await this.messengerClient.sendButtonTemplate(
      userId,
      `Estas son nuestras opciones, si quieres volver a ellas, más tarde, solo escribe “opciones”`,
      [
        {
          type: BUTTON_TYPE.POSTBACK,
          title: 'Armar mi smart food',
          payload: FLOWS.START_CREATE_PLATE,
        },
      ],
    );
  }
}
