import {
  Box,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { SliderCounter } from '@smartfood/ui';

export const SelectSection = () => {
  const counterSize = useBreakpointValue<'small' | 'normal'>({
    base: 'small',
    lg: 'normal',
  });
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
          Elige tu base
        </Text>
        <Text fontWeight={'normal'} fontSize={['base', null, 'lg']}>
          Solo puedes escoger solo 01 opción
        </Text>
      </Box>
      <VStack w="full" spacing={4}>
        {Array.from({ length: 4 }).map((_, idx) => (
          <HStack spacing={4} w="full" key={idx} justifyContent="start">
            <SliderCounter value={1} size={counterSize} />
            <Text fontSize={['base', null, 'md']}>Arroz Sushi</Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};
