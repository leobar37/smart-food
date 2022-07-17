import { Box, Checkbox, Text, VStack, useToast } from '@chakra-ui/react';
import { Option } from '@smartfood/client/v2';
import { useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { FC, useEffect } from 'react';
import {
  currentStepAtom,
  trackSelectionFamily,
} from '../../atoms/buildProductAtoms';
type SelectSectionProps = {
  option: Option;
};
export const SelectSection: FC<SelectSectionProps> = ({ option }) => {
  const currentStep = useAtomValue(currentStepAtom);
  const setSelection = useUpdateAtom(trackSelectionFamily(currentStep));
  const selection = useAtomValue(trackSelectionFamily(currentStep));
  const toast = useToast();
  useEffect(() => {
    if (!selection) {
      setSelection({
        id: option.id,
        options: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSelection, selection]);

  return (
    <VStack w="full" maxW={'350px'} mb="4" mx={['auto', null, '5']} spacing={4}>
      <Box w="full">
        <Text
          fontWeight={'bold'}
          mt={4}
          fontSize={['xl', null, '2xl']}
          my="2"
          color="smartgreen.500"
        >
          {option.name}
        </Text>
        <Text fontWeight={'normal'} fontSize={['base', null, 'lg']}>
          {option.label}
        </Text>
      </Box>
      <VStack w="full" spacing={5} mt="3" alignItems={'start'}>
        {(option?.subOptions ?? []).map((subOption, idx) => (
          <Checkbox
            isChecked={(selection?.options ?? []).some(
              (d) => d == subOption.id,
            )}
            onChange={(e) => {
              if (selection.options.length >= (option.limit ?? 1)) {
                toast({
                  variant: 'solid',
                  position: 'top-right',
                  colorScheme: 'smartgreen',
                  status: 'success',
                  title: `Solo se permiten ${
                    option.limit
                  } ${option.name?.toLocaleLowerCase()}`,
                });
                return;
              }
              const value = e.target.value;
              const idsSet = new Set(selection?.options ?? []);
              if (idsSet.has(value)) {
                idsSet.delete(value);
              } else {
                idsSet.add(value);
              }
              setSelection({
                id: option.id,
                options: [...Array.from(idsSet)],
              });
            }}
            value={subOption.id}
            key={idx}
            colorScheme={'smartgreen'}
            size="lg"
          >
            <Text fontSize={['base', null, 'md']} ml={3}>
              {subOption.name}
            </Text>
          </Checkbox>
        ))}
      </VStack>
    </VStack>
  );
};
