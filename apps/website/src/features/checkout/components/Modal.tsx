import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { noop } from 'lodash';

export const ModalCheckout = () => {
  return (
    <Modal isOpen={false} onClose={noop} isCentered>
      <ModalOverlay />
      <ModalContent
        m={3}
        maxWidth={['2xl']}
        sx={{
          label: {
            fontSize: 'lg',
          },
          '.chakra-form-control': {
            my: [2, null, 3],
          },
        }}
      >
        <ModalHeader>
          <Text
            as="h3"
            color="smartgreen.500"
            textAlign={'center'}
            fontSize={['base', null, 'xl', '2xl']}
          >
            Antes de confirmar su pedido por favor complete en siguiente
            formulario.
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <RadioGroup>
              <Stack direction={['column', null, 'row']}>
                <Radio>Pedido para llevar</Radio>
                <Radio>Pedido para recoger en tienda</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl my="2">
            <FormLabel>Medio de pago:</FormLabel>
            <RadioGroup>
              <Stack direction={['column', null, 'row']}>
                <Radio>Yape</Radio>
                <Radio>Plin</Radio>
                <Radio>En efectivo</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Nombre:</FormLabel>
            <Input placeholder="Ejem: Lucero" />
          </FormControl>

          <FormControl>
            <FormLabel>Apellido:</FormLabel>
            <Input placeholder="Ejem: FIgueroa Hidalgo" />
          </FormControl>
          <FormControl>
            <FormLabel>Número de celular:</FormLabel>
            <Input placeholder="Ejem: FIgueroa Hidalgo" />
          </FormControl>
          <FormControl>
            <FormLabel>Dirección:</FormLabel>
            <Input placeholder="Ejem: FIgueroa Hidalgo" />
          </FormControl>

          <FormControl>
            <FormLabel>Referencia:</FormLabel>
            <Textarea placeholder="Ejem: FIgueroa Hidalgo" />
          </FormControl>
          <Stack my={4} alignItems={'center'}>
            <Button maxW={'max-content'} colorScheme={'smartgray'} size="lg">
              Confirmar
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
