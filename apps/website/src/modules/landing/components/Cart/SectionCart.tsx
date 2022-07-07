import { Box, Text, VStack } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

export type SectionItemsProps = {
  title: string;
  children: ReactNode;
};

export const SectionItems: FC<SectionItemsProps> = ({ title, children }) => {
  return (
    <Box textAlign="left">
      <Text
        sx={{
          textTransform: 'uppercase',
          color: 'smartgray.500',
          fontWeight: 'semibold',
          fontSize: ['base', null, 'xl'],
        }}
      >
        {title}
      </Text>
      <VStack alignItems={'flex-start'} mt={5} mb={5} spacing={4}>
        {children}
      </VStack>
    </Box>
  );
};
