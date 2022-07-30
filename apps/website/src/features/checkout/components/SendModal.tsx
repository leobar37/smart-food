import cmsLib from '@App/core/lib/cms';
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { OrderOutput } from '@smartfood/client/v2';
import { buildWtsMessage } from '@smartfood/common';
import { CheckIcon } from '@smartfood/ui';
import { useAtom } from 'jotai';
import { noop } from 'lodash';
import { useState } from 'react';
import { confirmModalAtom } from '../atoms';
import { TEMPORAL_ORDER_KEY } from '../constants';
import { useRouter } from 'next/router';
export const ConfirmationModal = () => {
  const [confirmModalState] = useAtom(confirmModalAtom);
  const order = cmsLib.storage.getJson<OrderOutput>(TEMPORAL_ORDER_KEY);
  const [count, setCount] = useState(0);
  const router = useRouter();
  if (!order) {
    return null;
  }
  return (
    <Modal isOpen={confirmModalState} isCentered onClose={noop}>
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
            mb="2"
          >
            Gracias por preferirnos, necesitamos CONFIRMAR tu orden. Puedes
            presionar el siguiente botón o enviar un mensaje con tu número de
            orden al +51987654321
          </Text>
          <Text
            as="h5"
            color="smartgray.500"
            fontSize={['md', 'lg']}
            textAlign="center"
            width="100%"
            mb="4"
            mx="auto"
            w="full"
            fontWeight={'bold'}
          >
            Nro de Orden: <Text>{order.orderNumber}</Text>
          </Text>

          <HStack justifyContent={'center'}>
            <Button
              onClick={() => {
                const message = buildWtsMessage(`
                Hola, quiero confimar mi pedido, con número ${order.orderNumber}
              `);
                setCount((prev) => prev + 1);
                window.open(message);
              }}
              width="2xs"
              size="lg"
              colorScheme="smartgray"
            >
              Confirmar tu orden
            </Button>
            {count > 0 && (
              <Button
                size="lg"
                width="2xs"
                onClick={() => {
                  localStorage.removeItem(TEMPORAL_ORDER_KEY);
                  router.replace('/');
                }}
              >
                Ir al inicio
              </Button>
            )}
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
