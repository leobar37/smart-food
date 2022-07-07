import { ComponentMeta } from '@storybook/react';
import { VStack, HStack, IconButton } from '@chakra-ui/react';
import { CartIconWithCounter } from '../components';

export default {
  title: 'Components / CartIconWithCounter',
} as ComponentMeta<any>;

const Template = (args: any) => {
  return (
    <VStack mt="16">
      <HStack>
        <IconButton
          aria-label="cart-button"
          icon={<CartIconWithCounter value={args.value} />}
        />
      </HStack>
    </VStack>
  );
};

export const Default = Template.bind({});
Default.args = {
  value: 0,
};
