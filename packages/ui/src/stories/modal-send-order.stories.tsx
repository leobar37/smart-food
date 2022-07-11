import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components / Modal Send Order',
} as ComponentMeta<any>;

export const Default = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <VStack mt="16">
      <HStack>
        <Button onClick={onOpen}>Open modal</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalContent>
              <ModalBody>
                Gracias por preferirnos, el detalle de tu pedido fue enviado a
                tu whatsApp. Por el mismo medio se te enviará el código para que
                puedas realizar el deposito. ¡Disfruta tu pedido!
              </ModalBody>
            </ModalContent>
          </ModalContent>
        </Modal>
      </HStack>
    </VStack>
  );
};
