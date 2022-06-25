import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button , useTheme } from '@chakra-ui/react'
export default {
  title: 'Components / button',
} as ComponentMeta<any>;

export const Test = () => {

  return <Button variant={"me"} >Hello :) asasasa</Button>;
};
