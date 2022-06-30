import { Brand } from '../components/brand';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { HStack, VStack } from '@chakra-ui/react';

export default {
  title: 'components / brand',
  component: Brand,
} as ComponentMeta<typeof Brand>;

export const Normal: ComponentStory<typeof Brand> = ({ ...args }) => {
  return (
    <HStack spacing={10}>
      <VStack spacing={5}>
        <Brand size="lg" {...args} />
        <Brand size="sm" {...args} />
      </VStack>

      <VStack background={'smartgreen.700'} p="5">
        <Brand color="black" size="lg" {...args} />
        <Brand color="black" size="sm" {...args} />
      </VStack>
    </HStack>
  );
};

Normal.args = {};
