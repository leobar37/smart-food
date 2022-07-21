import {
  Box,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { useResumePreviewModal } from './helpers';
import { ResumenContainer, ResumeTitle } from './elements';
import ResumeContent from './ResumeContent';

export const ResumenPreview = () => {
  return (
    <ResumenContainer shadow={'xl'}>
      <ResumeTitle>Resumen</ResumeTitle>
      <ResumeContent />
    </ResumenContainer>
  );
};

export const ResumenPreviewModal = () => {
  const modalState = useResumePreviewModal();
  return (
    <Modal isOpen={modalState.isOpen} onClose={modalState.onClose}>
      <ModalOverlay />
      <ModalBody>
        <ModalContent mx={5}>
          <ModalCloseButton />
          <ResumenContainer mx="auto">
            <ResumeContent />
            <Box w="full" display={'flex'} my="5">
              <Link
                onClick={modalState.onClose}
                color={'smartgreen.500'}
                fontSize="lg"
                mx="auto"
              >
                Ocultar resumen
              </Link>
            </Box>
          </ResumenContainer>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};
