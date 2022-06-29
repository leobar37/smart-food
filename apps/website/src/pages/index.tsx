import { Box } from '@chakra-ui/react';
import { Component } from '@smartfood/ui';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Box justifyContent={"space-between"}>
      <Component />
    </Box>
  );
};

export default Home;
