import { Center, Text } from '@chakra-ui/react';

export const NotFound = () => {
  return (
    <Center className="content">
      <Text fontWeight={'normal'} fontSize="2xl" color={'gray.400'}>
        No se encontraron resultados
      </Text>
    </Center>
  );
};

export default NotFound;
