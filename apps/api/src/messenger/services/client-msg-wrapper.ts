import { AnyFunction } from '@App/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessengerClient, MessengerBatch } from 'messaging-api-messenger';
import {
  concat,
  filter,
  firstValueFrom,
  from,
  map,
  Observable,
  pluck,
  skip,
} from 'rxjs';
import { MessengerEvent } from '../enums';
import { sleep } from '@App/utiliies';
import {
  MessengerEventBus,
  SuscribeResponse,
} from '../eventBus/MessengerEventBus';
import { InjectMessenger } from '../providers/messenger-client';
import { messagePick } from '../utils/pick';
@Injectable()
export class MessengerWrapper {
  constructor(
    private readonly configService: ConfigService,
    @InjectMessenger() private readonly messengerClient: MessengerClient,
    private readonly eventBus: MessengerEventBus,
  ) {}

  sendText(...args: Parameters<MessengerClient['sendText']>) {
    const senderId = args[0];
    this.messengerClient.sendText(...args);
    const obs = this.eventBus
      .ofType(MessengerEvent.MESSAGE)
      .pipe(filter((e) => e.message.sender.id === senderId));
    return obs;
  }

  async sendTextSync(...args: Parameters<MessengerClient['sendText']>) {
    return firstValueFrom(this.sendText(...args));
  }

  awaitResponse(...args: Parameters<MessengerEventBus['ofType']>) {
    return (callback: AnyFunction): Observable<SuscribeResponse> => {
      const source$ = concat(from(callback()), this.eventBus.ofType(...args));
      return source$.pipe(skip(1)) as any;
    };
  }

  filterReplyOperator(payload: string) {
    return (source$: Observable<SuscribeResponse>) => {
      return source$.pipe(
        filter((e) => e.message?.message?.quick_reply?.payload === payload),
      );
    };
  }

  async sendTyping(senderId: string, delay: number) {
    await this.messengerClient.typingOn(senderId);
    await sleep(delay);
    await this.messengerClient.typingOff(senderId);
  }

  onlyTextOperator(source$: Observable<SuscribeResponse>) {
    return source$.pipe(pluck('message', 'message', 'text'));
  }
  confirm(senderId: string, text: string): Promise<boolean> {
    return firstValueFrom(
      this.sendText(senderId, text, {
        quickReplies: [
          {
            contentType: 'text',
            title: 'Si',
            payload: 'yes',
          },
          {
            contentType: 'text',
            title: 'No',
            payload: 'no',
          },
        ],
      }).pipe(map((e) => messagePick.replyPayload(e) === 'yes')),
    );
  }
}
