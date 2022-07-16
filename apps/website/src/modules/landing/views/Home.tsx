import { Box } from '@chakra-ui/react';
import { useBreakpintValue } from '@smartfood/ui';
import { NextPage } from 'next';
import Header from '../components/home/header';
import { ArmedProducts, Footer, ProductsLine } from '../shared';
import NavBar from '../shared/navbar';
import { useCategoriesWithProducts } from '../controllers';
import { Product } from '@smartfood/client/v2';
import { PRODUCTS_FOR_BUILD_ID } from '../constants';
const dataDefault = {
  title: `Prueba nuestros armados para ti`,
  description: ` Elige entre toda la variedad de platos deliciosos que hemos armado
  pensando en ti.`,
};
const HomePage: NextPage = () => {
  const breakpoint = useBreakpintValue();
  const { data: categoryData } = useCategoriesWithProducts();

  const linesInHome = categoryData
    ?.filter((d) => d.id !== PRODUCTS_FOR_BUILD_ID)
    .map((category) => {
      return (
        <ProductsLine
          key={category.id}
          title={category.title as string}
          description={category.description as string}
          products={category.products as Product[]}
        />
      );
    });

  return (
    <Box>
      <NavBar />
      <Header />
      <ArmedProducts />
      {linesInHome}
      <Footer />
    </Box>
  );
};

export default HomePage;
