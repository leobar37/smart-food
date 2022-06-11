export const BOT_ERRORS = {
  UNKNON_ERROR: 'Unknown error',
  CANCEL_ORDER: 'Cancel order',
};
export type ErrorCodes = keyof typeof BOT_ERRORS;
export class BotError extends Error {
  senderId: string;
  code: string;
  constructor(senderId: string, code: ErrorCodes, message?: string) {
    super(message);
    this.name = 'BotError';
    this.senderId = senderId;
    this.code = BOT_ERRORS[code];
  }
}
