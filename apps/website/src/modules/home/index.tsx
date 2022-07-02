import { NavBar } from '@App/components';
import { ArmedProducts, Footer, ProductsLine } from '@App/shared';
import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import Header from './Header';

const HomePage: NextPage = () => {
  return (
    <Box>
      <NavBar />
      <Header />
      <ArmedProducts />
      <ProductsLine />
      <ProductsLine />
      <ProductsLine />
      <ProductsLine />
      <Footer />
    </Box>
  );
};

export default HomePage;
