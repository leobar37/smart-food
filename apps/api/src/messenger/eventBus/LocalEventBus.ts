import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { filter, map, Subject } from 'rxjs';
import { ClientSession } from '../model/Session';
import { SessionManager } from '../session.manager';

@Injectable()
export class LocalEventBus implements OnModuleDestroy {
  private eventStream = new Subject<{ event: string; senderId: string }>();
  private destroy$ = new Subject<void>();

  constructor(private readonly sessionManager: SessionManager) {}

  onModuleDestroy() {
    this.destroy$.next();
  }
  emitEvent(event: string, senderId?: string) {
    this.eventStream.next({
      event,
      senderId,
    });
  }
  ofType(event: string | string[]) {
    return this.eventStream.pipe(
      filter((ev) =>
        Array.isArray(event) ? event.includes(ev.event) : event === ev.event,
      ),
      map((ev) => {
        const session = this.sessionManager.getSession(ev.senderId);
        if (session) {
          return session;
        }
        const newSession = new ClientSession(ev.senderId);
        this.sessionManager.addSession(newSession);
        return newSession;
      }),
    );
  }
}
