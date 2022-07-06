import { useEffect, useState } from 'react';
import { ComponentMeta } from '@storybook/react';
import { VStack, HStack } from '@chakra-ui/react';
import { Stepper, StepperItem } from '../components';

export default {
  title: 'Components / Stepper',
} as ComponentMeta<any>;

const Template = (args: any) => {
  const [step, setStep] = useState(args);

  useEffect(() => {
    setStep(args.value);
  }, [args.value]);

  return (
    <VStack mt="16">
      <HStack width="400px">
        <Stepper value={step} onChange={setStep}>
          <StepperItem>Base y proteína</StepperItem>
          <StepperItem>Veggies</StepperItem>
          <StepperItem>Salsas y toppings</StepperItem>
        </Stepper>
      </HStack>
    </VStack>
  );
};

export const Default = Template.bind({});
Default.args = {
  value: 0,
};
