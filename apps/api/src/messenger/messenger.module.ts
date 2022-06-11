import { Module } from '@nestjs/common';
import { HandlerController } from './handler.controller';
import { FacebookParser } from './client';
import { ValidationWebhook, MessengerWrapper, OrderService } from './services';
import { messenger_provider } from './providers';
import { MessengerEventBus } from './eventBus';
import allDialogs from './dialogs';
import { SessionManager } from './session.manager';
import { HandleInitService } from './init';

const DIALOGS = [...allDialogs];

@Module({
  controllers: [HandlerController],
  providers: [
    FacebookParser,
    ValidationWebhook,
    messenger_provider,
    MessengerEventBus,
    ...DIALOGS,
    HandleInitService,
    SessionManager,
    MessengerWrapper,
    OrderService,
  ],
})
export class MessengerModule {}
