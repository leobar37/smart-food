import { ComponentMeta } from '@storybook/react';
import { VStack, HStack } from '@chakra-ui/react';
import { SliderCounter } from '../components';
import { useState } from 'react';

export default {
  title: 'Components / SliderCounter',
} as ComponentMeta<any>;

const Template = (args: any) => {
  const [value, setValue] = useState(0);

  return (
    <VStack mt="16">
      <HStack>
        <SliderCounter
          {...args}
          value={('0' + value).slice(-2)}
          OnPlus={() => setValue((prev) => prev + 1)}
          OnMinus={() => setValue((prev) => prev - 1)}
        />
      </HStack>
    </VStack>
  );
};

export const Default = Template.bind({});
Default.args = {
  minusDisabled: false,
  plusDisabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  minusDisabled: true,
  plusDisabled: true,
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};
