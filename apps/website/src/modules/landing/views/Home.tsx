import { Box } from '@chakra-ui/react';
import { useBreakpintValue } from '@smartfood/ui';
import { NextPage } from 'next';
import Header from '../components/home/header';
import { ArmedProducts, Footer, ProductsLine } from '../shared';
import NavBar from '../shared/navbar';
import { useProducts } from '../controllers';

const HomePage: NextPage = () => {
  const breakpoint = useBreakpintValue();
  const { data } = useProducts();
  console.log(data);

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
