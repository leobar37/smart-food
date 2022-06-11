import { Injectable } from '@nestjs/common';
import { ClientSession } from './model/Session';

@Injectable()
export class SessionManager {
  sessions: Record<string, ClientSession> = {};
  constructor() {
    this.sessions = {};
  }
  getSession(userId: string): ClientSession {
    return this.sessions[userId];
  }
  addSession(session: ClientSession): void {
    if (!this.sessions[session.userId]) this.sessions[session.userId] = session;
  }
}
