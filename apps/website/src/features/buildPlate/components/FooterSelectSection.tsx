import { Button, HStack, Link, VStack } from '@chakra-ui/react';
import { useUpdateAtom } from 'jotai/utils';
import { useAtomValue } from 'jotai';
import { currentStepAtom, isLastStepAtom } from '@App/core/modules/product';
import { useResumePreviewModal, useConfirmModal } from '../helpers';

export const FooterSelectSection = () => {
  const updateStep = useUpdateAtom(currentStepAtom);
  const modalPreviewState = useResumePreviewModal();
  const isLastStep = useAtomValue(isLastStepAtom);
  const confirModal = useConfirmModal();
  return (
    <VStack mt={'8'} alignItems={['center', null, 'flex-start']}>
      <Link
        display={['initial', null, 'none']}
        color={'smartgreen.500'}
        fontSize={'md'}
        onClick={() => {
          modalPreviewState.onOpen();
        }}
      >
        Ver Resumen
      </Link>

      <HStack justifyContent={'space-around'}>
        <Button
          colorScheme={'smartgray'}
          variant="outline"
          minW={[null, null, '12rem']}
          onClick={() => {
            updateStep((prev) => {
              if (prev === 0) {
                return 0;
              }
              return prev - 1;
            });
          }}
          size="lg"
        >
          Atrás
        </Button>
        <Button
          minW={[null, null, '12rem']}
          colorScheme={'smartgray'}
          onClick={() => {
            updateStep((prev) => {
              if (isLastStep) {
                return prev;
              }
              return prev + 1;
            });
            if (isLastStep) {
              confirModal.onOpen();
            }
          }}
          size="lg"
        >
          {isLastStep ? 'Confirmar' : 'Continuar'}
        </Button>
      </HStack>
    </VStack>
  );
};
