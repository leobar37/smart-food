/* eslint-disable prettier/prettier */
import { Controller, Get, Req, Post, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationWebhook } from './services/validation.service';
import { FacebookParser } from './client';
import { InjectMessenger } from '../common/providers';
import { MessengerClient } from 'messaging-api-messenger';
import { MessengerEventBus } from './eventBus';
import { plainToClass } from 'class-transformer';
import { Message } from './model/Message';
import { SessionManager } from '../messenger/session.manager';
import { ClientSession } from './model/Session';
import { MessengerEvent } from './enums';

@Controller('/webhook')
export class HandlerController {
  constructor(
    private readonly validationWebhook: ValidationWebhook,
    private parser: FacebookParser,
    @InjectMessenger() private readonly messengerClient: MessengerClient,
    private readonly messengerEventBus: MessengerEventBus,
    private readonly sessionManager: SessionManager,
  ) {}

  @Get('')
  handler(@Req() req: Request) {
    return this.validationWebhook.validate(req);
  }

  @Post('')
  receiveMessages(@Req() req: Request, @Res() res: Response) {
    const incommingMessage = this.parser.parsePayload(req.body);
    incommingMessage.forEach((element) => {
      const message = plainToClass(Message, element);
      if (
        message?.sender?.id &&
        message.messageType() !== MessengerEvent.MESSAGE_ECHO
      ) {
        this.sessionManager.addSession(new ClientSession(message.sender.id));
      }

      this.messengerEventBus.emitMessage(message);
    });
    return res.sendStatus(200);
  }
}
