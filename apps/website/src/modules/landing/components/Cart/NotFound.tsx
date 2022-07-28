import { Text, VStack } from '@chakra-ui/react';
import NextImage from 'next/image';
import { FC } from 'react';
type NotResultsProps = {
  text?: string;
};

export const NotResults: FC<NotResultsProps> = ({ text }) => {
  return (
    <VStack maxWidth={'16rem'} justifyContent={'center'}>
      <NextImage
        width={180}
        height={180}
        objectFit="cover"
        src={'/not_found_cart.png'}
      />
      <Text textAlign={'center'} color="gray.400">
        {text}
      </Text>
    </VStack>
  );
};
