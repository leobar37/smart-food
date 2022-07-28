import { Box, Checkbox, Text, useToast, VStack } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { FC, useEffect } from 'react';
import {
  currentOptionsFamily,
  currentStepAtom,
  trackSelectionFamily,
} from '@App/core/modules/product';

export const SelectSection: FC = () => {
  const currentStep = useAtomValue(currentStepAtom);
  const option = useAtomValue(currentOptionsFamily(currentStep));
  const setSelection = useUpdateAtom(trackSelectionFamily(currentStep));
  const selection = useAtomValue(trackSelectionFamily(currentStep));
  const toast = useToast();

  useEffect(() => {
    if (!selection && option) {
      setSelection({
        id: option.id,
        options: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSelection, selection, option]);

  const onChange = (value: string) => {
    const idsSet = new Set(selection?.options ?? []);
    const isPresent = idsSet.has(value);
    if (isPresent) {
      idsSet.delete(value);
    }

    const isExceededLimit = Array.from(idsSet).length >= (option.limit ?? 1);

    if (isExceededLimit) {
      toast({
        variant: 'solid',
        position: 'top-right',
        colorScheme: 'smartgreen',
        status: 'success',
        title: `Solo se permiten ${
          option.limit
        } ${option.name?.toLocaleLowerCase()}`,
      });
    }
    if (!isExceededLimit && !isPresent) {
      idsSet.add(value);
    }
    setSelection({
      id: option.id,
      options: [...Array.from(idsSet)],
    });
  };

  if (!option) {
    return null;
  }

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
              const value = e.target.value;
              onChange(value);
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
