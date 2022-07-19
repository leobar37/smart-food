import {
  Box,
  BoxProps,
  HStack,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import { SubOption } from '@smartfood/client/v2';
import {
  ExtractAtomValue,
  PrimitiveAtom,
  useAtom,
  useAtomValue,
  useSetAtom,
} from 'jotai';
import { FC } from 'react';
import {
  currentProductAtom,
  currentStepAtom,
  resumePreviewAtomsAtom,
  resumePreviewItemsAtom,
} from '../../atoms/buildProductAtoms';
import { useResumePreviewModal } from './helpers';

type ResumenItemProps = {
  itemAtom: PrimitiveAtom<ExtractAtomValue<typeof resumePreviewItemsAtom>[0]>;
  showEdit?: boolean;
};

const ResumenItem: FC<ResumenItemProps> = ({ itemAtom, showEdit }) => {
  const item = useAtomValue(itemAtom);
  const stateModalResume = useResumePreviewModal();
  const updateStep = useSetAtom(currentStepAtom);

  if (item.subOptions.length == 0) {
    return null;
  }

  const listSuboptions = (
    <UnorderedList spacing={2}>
      {(item.subOptions as SubOption[]).map((subOption) => {
        return (
          <ListItem ml="3" key={subOption.id}>
            {subOption.name}
          </ListItem>
        );
      })}
    </UnorderedList>
  );

  return (
    <VStack
      borderBottomColor={'gray.300'}
      position="relative"
      pb="4"
      width={'full'}
      borderBottomWidth="1px"
      alignItems={'flex-start'}
    >
      <Box position={'absolute'} top="3" right={'0'}>
        {showEdit && (
          <Link
            onClick={() => {
              updateStep(item.step);
              stateModalResume.onClose();
            }}
          >
            Editar
          </Link>
        )}
      </Box>
      <VStack alignItems="flex-start">
        <Text
          fontWeight={['semibold', null, 'normal']}
          fontSize={['base', null, 'lg']}
          color="smartgreen.500"
        >
          {item.option?.name}
        </Text>
        {listSuboptions}
      </VStack>
    </VStack>
  );
};

ResumenItem.defaultProps = {
  showEdit: true,
};

type ResumeContentProps = {
  showEdit?: boolean;
} & BoxProps;
const ResumeContent: FC<ResumeContentProps> = ({ showEdit, ...props }) => {
  const [resumeItemsAtoms] = useAtom(resumePreviewAtomsAtom);
  const currentProduct = useAtomValue(currentProductAtom);
  return (
    <>
      <VStack alignItems={'flex-start'} mx="2" {...props}>
        {resumeItemsAtoms.map((item, idx) => (
          <ResumenItem showEdit={showEdit} itemAtom={item as any} key={idx} />
        ))}
      </VStack>
      <HStack justifyContent={'space-between'} mt="4">
        <Text fontSize={['medium', null, 'lg']}>Precio</Text>
        <Text fontSize={'2xl'} color="smartgreen.500" fontWeight="semibold">
          {currentProduct.price} S/.
        </Text>
      </HStack>
    </>
  );
};
ResumeContent.defaultProps = {
  showEdit: true,
};
export default ResumeContent;
