import { Module } from '@nestjs/common';
import { HandlerController } from './handler.controller';
import { FacebookParser } from './client';
import { ValidationWebhook, MessengerWrapper, OrderService } from './services';
import { ServiceModule } from '../service/service.module';
import { MessengerEventBus } from './eventBus';
import allDialogs from './dialogs';
import { SessionManager } from './session.manager';
import { HandleInitService } from './init';

const DIALOGS = [...allDialogs];

@Module({
  imports: [ServiceModule],
  controllers: [HandlerController],
  providers: [
    FacebookParser,
    ValidationWebhook,
    MessengerEventBus,
    ...DIALOGS,
    HandleInitService,
    SessionManager,
    MessengerWrapper,
    OrderService,
  ],
})
export class MessengerModule {}
