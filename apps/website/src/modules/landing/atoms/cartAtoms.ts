import { OrderLineOutput, OrderOutput } from '@smartfood/client/v2';
import { atom } from 'jotai';

export const currentOrderAtom = atom<OrderOutput | undefined>(undefined);

export const orderLinesAtom = atom<OrderLineOutput[] | undefined>((get) => {
  const currentOrder = get(currentOrderAtom);
  return currentOrder?.lines as OrderLineOutput[];
});

export const orderLinesCountAtom = atom<number>((get) => {
  const order = get(currentOrderAtom);
  return order?.linesCount ?? 0;
});

export const linesCountAtom = atom(0);

export type NotificationState = 'loading' | 'success';
export const notificationAddedAtom = atom({
  isOpen: false,
  state: 'loading' as NotificationState,
});
