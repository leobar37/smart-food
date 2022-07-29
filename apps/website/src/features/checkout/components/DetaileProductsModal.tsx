import {
  Box,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import DetailProducts from './DetailProducts';
import { useResumeModalDisclousure } from '../useResumModal';
export const DetailedProductsModal = () => {
  const { isOpen, onClose } = useResumeModalDisclousure();
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody py="4">
          <ModalCloseButton />
          <DetailProducts />
          <Box display={'block'} textAlign="center">
            <Link mx="auto" color="smartgreen.500">
              Cerrar
            </Link>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DetailedProductsModal;
