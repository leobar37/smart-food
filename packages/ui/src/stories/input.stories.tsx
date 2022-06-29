import { ComponentMeta } from '@storybook/react';

import { Input, VStack, HStack } from '@chakra-ui/react';

export default {
  title: 'Components / Inputs',
} as ComponentMeta<any>;

export const Default = () => {
  return (
    <VStack mt="16">
      <HStack>
        <Input placeholder="demo input" />
      </HStack>
    </VStack>
  );
};
