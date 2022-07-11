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
    <Modal isOpen={true} isCentered onClose={noop}>
      <ModalOverlay />
      <ModalContent
        padding={['19px', null, '40px', '48px']}
        margin="17px"
        maxWidth="3xl"
      >
        <ModalHeader padding="0" mb="32px">
          <VStack>
            <Stack
              width="88px"
              height="88px"
              bg="smartgreen.100"
              borderRadius="xl"
              justifyContent="center"
              alignItems="center"
            >
              <CheckIcon color="smartgreen.500" width="44px" height="44px" />
            </Stack>
            <Text
              as="h3"
              color="smartgreen.500"
              textAlign={'center'}
              fontSize={['17px', null, '2xl']}
            >
              Tu pedido se envió correctamente
            </Text>
          </VStack>
        </ModalHeader>
        <ModalBody width="100%" padding="0">
          <Text
            as="h5"
            color="smartgray.500"
            fontSize={['16px', '18px']}
            textAlign="center"
            width="100%"
            mb="32px"
          >
            Gracias por preferirnos, el detalle de tu pedido fue enviado a tu
            whatsApp. Por el mismo medio se te enviará el código para que puedas
            realizar el deposito. ¡Disfruta tu pedido!
          </Text>
          <VStack>
            <Button width="256px" height="48px" colorScheme="smartgray">
              Ir a inicio
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
