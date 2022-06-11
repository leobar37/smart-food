import { get } from 'lodash';
export const replyPayload = (payload: any) =>
  get(payload, 'message.message.quick_reply.payload', null);

export const messageText = (source: any) =>
  get(source, 'message.message.text', null);

export const messagePick = {
  replyPayload,
  messageText,
};
