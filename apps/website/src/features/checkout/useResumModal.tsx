import { useDisclosure } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { resumeModalAtom } from './atoms';
export const useResumeModalDisclousure = () => {
  const [state, setState] = useAtom(resumeModalAtom);

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
