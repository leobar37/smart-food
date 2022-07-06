import { Box, chakra, HStack, Link, Text, VStack } from '@chakra-ui/react';

const ResumenContainer = chakra('aside', {
  baseStyle: {
    bg: '#FCFCFD',
    p: '5',
    shadow: 'xl',
    rounded: 'md',
    mt: 9,
    maxW: '24rem',
    overflow: 'hidden',
    '.title': {
      fontSize: '2xl',
      mx: 'auto',
      textAlign: 'center',
      color: 'smartgreen.500',
      fontWeight: 'semibold',
    },
  },
});

const ResumenItem = () => {
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
        <Link>Editar</Link>
      </Box>
      {Array.from({ length: 2 }).map((_, idx) => (
        <VStack key={idx} alignItems="flex-start">
          <Text
            fontWeight={['semibold', null, 'normal']}
            fontSize={['base', null, 'lg']}
            color="smartgreen.500"
          >
            Base
          </Text>
          <Text>Arroz Sushi</Text>
        </VStack>
      ))}
    </VStack>
  );
};

export const ResumenPreview = () => {
  return (
    <ResumenContainer>
      <Text className="title">Resumen</Text>
      <VStack alignItems={'flex-start'} mx="2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <ResumenItem key={idx} />
        ))}
      </VStack>
      <HStack justifyContent={'space-between'} mt="4">
        <Text fontSize={['medium', null, 'lg']}>Precio</Text>
        <Text fontSize={'2xl'} color="smartgreen.500" fontWeight="semibold">
          S/. 24.90
        </Text>
      </HStack>
    </ResumenContainer>
  );
};
