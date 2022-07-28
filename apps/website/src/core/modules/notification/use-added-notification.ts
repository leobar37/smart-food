import { useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { notificationAddedAtom, NotificationState } from './atoms';
export const useNotificationCart = () => {
  const updatePopover = useUpdateAtom(notificationAddedAtom);
  const state = useAtomValue(notificationAddedAtom);

  const open = (state: NotificationState) => {
    updatePopover({
      isOpen: true,
      state: state,
    });
  };

  const close = () => {
    updatePopover({
      isOpen: false,
      state: 'loading',
    });
  };
  return {
    open,
    close,
    isOpen: state.isOpen,
    state: state.state,
  };
};
