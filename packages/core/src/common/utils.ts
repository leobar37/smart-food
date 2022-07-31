import { get } from 'lodash';
export const createMapper = (dictionary: any, prop?: string) =>
  Object.keys(dictionary).reduce((acc, curr) => {
    acc[curr] = dictionary[curr][prop ?? 'id'];
    return acc;
  }, {});
const format = (...arr: string[]) => {
  return arr.join('\n');
};

export const messageUtils = {
  format,
  separator: '===============',
};
export const replyPayload = (payload: any) =>
  get(payload, 'message.message.quick_reply.payload', null);

export const messageText = (source: any) =>
  get(source, 'message.message.text', null);

export const messagePick = {
  replyPayload,
  messageText,
};
