import { Box } from '@chakra-ui/react';
import Header from './components/header';
import { PRODUCTS_FOR_BUILD_ID } from '@App/core/constants';
import {
  useCategoriesWithProducts,
  ProductsGrid,
} from '@App/core/modules/product';
import { LandingLayout } from '@App/core/shared-components/layout';
import SearchInput from './components/Search';

export const MenuPage = () => {
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
        <SearchInput />
      </Box>
      <Box mb={12}>{linesInHome}</Box>
    </LandingLayout>
  );
};

export default MenuPage;
