import { NextPage } from 'next';
import { ExoticCard } from '@smartfood/ui';
import { Box, Heading } from '@chakra-ui/react';

const HomePage: NextPage = () => {
  return (
    <Box as="nav">
      <Heading color="smartgreen.700">hello home</Heading>
    </Box>
  );
};

export default HomePage;
