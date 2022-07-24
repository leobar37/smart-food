import { useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { notificationAddedAtom } from '../atoms/cartAtoms';
export const useNotificationCart = () => {
  const updatePopover = useUpdateAtom(notificationAddedAtom);
  const isOpen = useAtomValue(notificationAddedAtom);
  const open = () => {
    updatePopover(true);
  };

  const close = () => {
    updatePopover(false);
  };
  return {
    open,
    close,
    isOpen,
  };
};
