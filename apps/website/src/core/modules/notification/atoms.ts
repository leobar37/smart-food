import { atom } from 'jotai';

export type NotificationState = 'loading' | 'success';
export const notificationAddedAtom = atom({
  isOpen: false,
  state: 'loading' as NotificationState,
});
