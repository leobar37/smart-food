import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { BtnIcon, CheckIcon } from '@smartfood/ui';
import { useRouter } from 'next/router';
import { ReactNode, useState, useMemo } from 'react';
import { useBreakpointValueSSR } from '@App/core/hooks';
import { ResumeTitle } from './elements';
import { useConfirmModal } from '../helpers';
import ResumeContent from './ResumeContent';
import {
  trackedSelectionAtom,
  currentProductAtom,
} from '@App/core/modules/product';
import { useAtomValue } from 'jotai';
import { useAddToCart } from '@App/core/modules/cart';
import { useQueryClient } from 'react-query';
import { mutationsKeys } from '@App/core/constants';
import { useNotificationCart } from '@App/core/modules/notification';
// TODO: move this to controllers folder
const useConfirmationController = () => {
  const addToCart = useAddToCart();
  const trackSelection = useAtomValue(trackedSelectionAtom);
  const currentProduct = useAtomValue(currentProductAtom);
  const saveBuildPlate = () => {
    return addToCart.mutateAsync({
      productId: currentProduct.id,
      quantity: 1,
      selection: {
        options: Object.values(trackSelection),
      },
    });
  };
  return saveBuildPlate;
};

export const ModalConfirmationPlate = () => {
  const [section, setSection] = useState<'resume' | 'notification'>('resume');
  const { isOpen, onClose } = useConfirmModal();
  const sizeButtons = ['xs', 'md', 'lg'];
  const router = useRouter();
  const isModal = useBreakpointValueSSR([false, false, true, true]);

  const saveBuildPlate = useConfirmationController();

  const queryClient = useQueryClient();
  const notificationCart = useNotificationCart();

  const sections = useMemo(
    () => ({
      resume: (
        <Box>
          <ResumeTitle>¿Desea confirmar su elección?</ResumeTitle>
          <ResumeContent showEdit={false} />
          <ModalFooter>
            <HStack justifyContent={'center'} mt="5" mx="auto" w="full">
              <Button
                variant={'outline'}
                size={sizeButtons}
                colorScheme={'smartgray'}
              >
                Cancelar
              </Button>
              <Button
                loadingText="Cargando..."
                isLoading={notificationCart.isOpen}
                onClick={async () => {
                  await saveBuildPlate();
                  setSection('notification');
                }}
                size={sizeButtons}
                colorScheme={'smartgray'}
              >
                Confirmar
              </Button>
            </HStack>
          </ModalFooter>
        </Box>
      ),
      notification: (
        <Box my="auto">
          <VStack>
            <BtnIcon
              w="16"
              h="16"
              display={'flex'}
              justifyContent="center"
              alignItems={'center'}
              bg="smartgreen.100"
            >
              <CheckIcon
                sx={{
                  path: {
                    color: 'smartgreen.500',
                  },
                }}
              />
            </BtnIcon>
            <ResumeTitle my="2">
              Tu pedido se añadió correctamente al carrito de compras
            </ResumeTitle>
          </VStack>
          <HStack justifyContent={'center'} mt="5" mx="auto" w="full">
            <Button
              size={sizeButtons}
              onClick={() => {
                router.push('/checkout');
              }}
              colorScheme={'smartgray'}
            >
              Pedir ahora
            </Button>
            <Button
              onClick={() => {
                router.push('/carta');
              }}
              size={sizeButtons}
              colorScheme={'smartgreen'}
            >
              Seguir comprando
            </Button>
          </HStack>
        </Box>
      ),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [notificationCart.isOpen, saveBuildPlate],
  );
  const content = sections[section];

  const renderModal = (content: ReactNode) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={'4'} minW={['initial', null, '600px']}>
          <ModalCloseButton />
          <ModalBody my="8">{content}</ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  const renderDrawer = (content: ReactNode) => {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerBody>
          <DrawerHeader></DrawerHeader>
          <DrawerContent>
            <DrawerCloseButton />
            <Box
              display={'flex'}
              alignItems="center"
              my="auto"
              overflowY={'scroll'}
              px="5"
              pt="32"
            >
              {content}
            </Box>
          </DrawerContent>
        </DrawerBody>
      </Drawer>
    );
  };

  const renderContent = isModal ? renderModal : renderDrawer;

  return <>{renderContent(content)}</>;
};
