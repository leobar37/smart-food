import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectMessenger } from '../../common/providers';
import { MessengerClient } from 'messaging-api-messenger';
import { ACTIONS } from '../actions';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HandleInitService implements OnModuleInit {
  constructor(
    @InjectMessenger() private readonly messenger: MessengerClient,
    private readonly configService: ConfigService,
  ) {}
  async onModuleInit() {
    const persistenMenu = await this.messenger.getPersistentMenu();
    const existPostback = persistenMenu.some((el) =>
      el.callToActions.some((b) => b.payload === ACTIONS.SHOW_MENU),
    );
    if (!existPostback) {
      console.log('postback no exist');
      await this.messenger.setGreeting(
        'Hola, bienvenido a smartfood, comida saludable',
      );
      await this.messenger.setGetStarted(ACTIONS.GET_STARTED);
      await this.messenger.setPersistentMenu([
        {
          locale: 'default',
          composerInputDisabled: false,
          callToActions: [
            {
              title: 'Hacer un pedido',
              type: 'postback',
              payload: ACTIONS.SHOW_MENU,
            },
          ],
        },
      ]);
    }
  }
}
