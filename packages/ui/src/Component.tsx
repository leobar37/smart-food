import { FC } from 'react';
import * as React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
export type ComponentProps = {};
export const Component: FC<ComponentProps> = ({}) => {
  return (
    <>
      <Text>:o this works percfectly</Text>
      <Box bg={'red.300'} textColor="yellow">
        hello world chakra
      </Box>
      <Heading>hello heading</Heading>
      <div>one</div>
      <div>two</div>
      <div>three</div>
      <div>three</div>
      <div>three</div>
      <div>three</div>
      <div>three</div>
      <div>three</div>
      <div>three</div>
      <div>three</div>
      <div>three</div>
      <div>three</div>
      <div>three</div>
      <div>three</div>
    </>
  );
};
