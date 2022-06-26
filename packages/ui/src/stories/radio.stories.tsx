import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { ComponentMeta } from '@storybook/react';
import { useState } from 'react';
export default {
    title: 'Components / radio',
  } as ComponentMeta<any>;
  

export const Default = () => {
  const [value, setValue] = useState('1')
    return<RadioGroup onChange={setValue} value={value}>
    <Stack direction='row'>
      <Radio  value='1'>First</Radio>
      <Radio value='2'>Second</Radio>
      <Radio value='3'>Third</Radio>
    </Stack>
  </RadioGroup>
}