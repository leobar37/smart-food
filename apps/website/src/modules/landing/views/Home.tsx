import { Box } from '@chakra-ui/react';
import { useBreakpintValue } from '@smartfood/ui';
import { NextPage } from 'next';
import Header from '../components/home/header';
import { ArmedProducts, Footer, ProductsLine } from '../shared';
import NavBar from '../shared/navbar';
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
