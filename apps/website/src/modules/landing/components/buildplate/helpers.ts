import { useDisclosure } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import {
  modalResumeStateAtom,
  modalConfirmSelectionAtom,
} from '../../atoms/buildProductAtoms';

export const useConfirmModal = () => {
  const [state, setState] = useAtom(modalConfirmSelectionAtom);
  return useDisclosure({
    isOpen: state,
    onOpen: () => {
      setState(true);
    },
    onClose: () => {
      setState(false);
    },
  });
};

export const useResumePreviewModal = () => {
  const [state, setState] = useAtom(modalResumeStateAtom);

  return useDisclosure({
    isOpen: state,
    onOpen: () => {
      setState(true);
    },
    onClose: () => {
      setState(false);
    },
  });
};
