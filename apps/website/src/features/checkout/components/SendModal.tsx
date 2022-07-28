import {
  Box,
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  VStack,
  ModalBody,
  Button,
} from '@chakra-ui/react';
import { CheckIcon } from '@smartfood/ui';

import { noop } from 'lodash';

export const SendModal = () => {
  return (
    <Modal isOpen={false} isCentered onClose={noop}>
      <ModalOverlay />
      <ModalContent padding={['5', null, '10', '12']} margin="4" maxWidth="3xl">
        <ModalHeader padding="0" mb="8">
          <VStack>
            <Stack
              width="5.5rem"
              height="5.5rem"
              bg="smartgreen.100"
              borderRadius="xl"
              justifyContent="center"
              alignItems="center"
            >
              <CheckIcon
                color="smartgreen.500"
                width="2.75rem"
                height="2.17rem"
              />
            </Stack>
            <Text
              as="h3"
              color="smartgreen.500"
              textAlign={'center'}
              fontSize={['md', null, '2xl']}
            >
              Tu pedido se envió correctamente
            </Text>
          </VStack>
        </ModalHeader>
        <ModalBody width="100%" padding="0">
          <Text
            as="h5"
            color="smartgray.500"
            fontSize={['md', 'lg']}
            textAlign="center"
            width="100%"
            mb="8"
          >
            Gracias por preferirnos, el detalle de tu pedido fue enviado a tu
            whatsApp. Por el mismo medio se te enviará el código para que puedas
            realizar el deposito. ¡Disfruta tu pedido!
          </Text>
          <VStack>
            <Button width="2xs" height="3rem" colorScheme="smartgray">
              Ir a inicio
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
