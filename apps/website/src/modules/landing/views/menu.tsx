import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import Header from '../components/menu/header';
import { PRODUCTS_FOR_BUILD_ID } from '../constants';
import { useCategoriesWithProducts } from '../controllers';
import { LandingLayout } from '../landingLayout';
import { ProductsGrid } from '../shared';
export const MenuPage = () => {
  const inputSearchSize = useBreakpointValue({
    base: 'md',
    lg: 'lg',
  });

  const { data: categories } = useCategoriesWithProducts();

  const linesInHome = categories
    ?.filter((d) => d.id !== PRODUCTS_FOR_BUILD_ID)
    .map((category) => {
      return (
        <ProductsGrid
          title={category.title ?? ''}
          description={category.description ?? ''}
          products={category.products ?? []}
          key={category.id}
        />
      );
    });

  return (
    <LandingLayout>
      <Header />
      <Box textAlign={'center'} my={8}>
        <InputGroup
          size={inputSearchSize}
          maxW={['300px', null, 'xl', '3xl']}
          mx="auto"
        >
          <InputLeftElement>
            <FiSearch />
          </InputLeftElement>
          <Input placeholder="¿Qué te provoca pedir?" />
        </InputGroup>
      </Box>
      <Box mb={12}>{linesInHome}</Box>
    </LandingLayout>
  );
};

export default MenuPage;
