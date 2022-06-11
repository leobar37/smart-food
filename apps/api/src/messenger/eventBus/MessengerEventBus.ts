import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { isNil } from 'lodash';
import { filter, Observable, Subject, takeUntil, map } from 'rxjs';
import { MessengerEvent } from '../enums';
import { Message } from '../model/Message';
import { SessionManager } from '../session.manager';
import { ClientSession } from '../model/Session';
import { buildFindByWords } from '@App/utiliies';
export type SuscribeResponse = { message: Message; session: ClientSession };

@Injectable()
export class MessengerEventBus implements OnModuleDestroy {
  private eventStream = new Subject<Message>();
  private destroy$ = new Subject<void>();

  constructor(private readonly sessionManager: SessionManager) {}

  onModuleDestroy() {
    this.destroy$.next();
  }
  emitMessage(msg: Message) {
    this.eventStream.next(msg);
  }

  toMatchWords(...params: Parameters<typeof buildFindByWords>) {
    const matcher = buildFindByWords(...params);
    return this.ofType(MessengerEvent.MESSAGE).pipe(
      filter((m) => {
        return matcher(m?.message?.message?.text);
      }),
    );
  }

  ofType(
    event: MessengerEvent | MessengerEvent[],
    payload?: string | string[],
  ): Observable<SuscribeResponse> {
    return this.eventStream.pipe(
      takeUntil(this.destroy$),
      filter((e) => {
        if (Array.isArray(event)) {
          return event.includes(e.messageType());
        }
        return e.messageType() === event;
      }),
      filter((e) =>
        isNil(e.payload()) || isNil(payload)
          ? true
          : Array.isArray(payload)
          ? payload.includes(e.payload())
          : payload && e.payload() === payload,
      ),
      map((msg) => ({
        message: msg,
        session: this.sessionManager.getSession(msg.sender.id),
      })),
    );
  }
}
