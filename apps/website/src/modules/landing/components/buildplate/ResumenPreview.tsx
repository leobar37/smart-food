import {
  Box,
  chakra,
  HStack,
  Link,
  ModalBody,
  Text,
  VStack,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { FC } from 'react';
import {
  modalResumeStateAtom,
  resumePreviewAtomsAtom,
  resumePreviewItemsAtom,
  currentStepAtom,
} from '../../atoms/buildProductAtoms';
import {
  useAtom,
  ExtractAtomValue,
  PrimitiveAtom,
  useAtomValue,
  useSetAtom,
} from 'jotai';

const ResumenContainer = chakra('aside', {
  baseStyle: {
    bg: 'white',
    p: '5',
    rounded: 'md',
    mt: [2, null, 9],
    maxW: '24rem',
    overflow: 'hidden',
    w: ['20rem', '25rem'],
    '.title': {
      fontSize: '2xl',
      mx: 'auto',
      textAlign: 'center',
      color: 'smartgreen.500',
      fontWeight: 'semibold',
    },
  },
});

type ResumenItemProps = {
  itemAtom: PrimitiveAtom<ExtractAtomValue<typeof resumePreviewItemsAtom>[0]>;
};
const ResumenItem: FC<ResumenItemProps> = ({ itemAtom }) => {
  const item = useAtomValue(itemAtom);
  const stateModalResume = useResumePreviewModal();
  const updateStep = useSetAtom(currentStepAtom);
  if (item.subOptions.length == 0) {
    return null;
  }
  return (
    <VStack
      borderBottomColor={'gray.300'}
      position="relative"
      pb="4"
      width={'full'}
      borderBottomWidth="1px"
      alignItems={'flex-start'}
    >
      <Box position={'absolute'} top="0" right={'0'}>
        <Link
          onClick={() => {
            updateStep(item.step);
            stateModalResume.onClose();
          }}
        >
          Editar
        </Link>
      </Box>
      <VStack alignItems="flex-start">
        <Text
          fontWeight={['semibold', null, 'normal']}
          fontSize={['base', null, 'lg']}
          color="smartgreen.500"
        >
          {item.option?.name}
        </Text>
        <UnorderedList spacing={2}>
          {item?.subOptions.map((item) => {
            return (
              <ListItem ml="3" key={item?.id}>
                {item?.name}
              </ListItem>
            );
          })}
        </UnorderedList>
      </VStack>
    </VStack>
  );
};

const ResumeContent = () => {
  const [resumeItemsAtoms, dispatch] = useAtom(resumePreviewAtomsAtom);
  return (
    <>
      <Text className="title">Resumen</Text>
      <VStack alignItems={'flex-start'} mx="2">
        {resumeItemsAtoms.map((item, idx) => (
          <ResumenItem itemAtom={item as any} key={idx} />
        ))}
      </VStack>
      <HStack justifyContent={'space-between'} mt="4">
        <Text fontSize={['medium', null, 'lg']}>Precio</Text>
        <Text fontSize={'2xl'} color="smartgreen.500" fontWeight="semibold">
          S/. 24.90
        </Text>
      </HStack>
    </>
  );
};

export const ResumenPreview = () => {
  return (
    <ResumenContainer shadow={'xl'}>
      <ResumeContent />
    </ResumenContainer>
  );
};

export const useResumePreviewModal = () => {
  const [state, setState] = useAtom(modalResumeStateAtom);

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
