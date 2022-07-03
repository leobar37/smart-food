import { NavBar } from '@App/components';
import { ArmedProducts, Footer, ProductsLine } from '@App/shared';
import { Box, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import Header from './Header';
import { useBreakpintValue } from '@smartfood/ui';
const HomePage: NextPage = () => {
  const breakpoint = useBreakpintValue();

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
