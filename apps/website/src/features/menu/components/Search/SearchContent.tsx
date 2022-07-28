import { FC } from 'react';
import { useProductsWithSearch } from '@App/core/modules/product';
import { SearchContainer } from './elements';
import NotFound from './NotFound';
import ProductsContent from './ProductsContent';
type SearchContentProps = {
  isOpen?: boolean;
};

export const SearchContent: FC<SearchContentProps> = ({ isOpen }) => {
  const products = useProductsWithSearch();
  const isEmpty = products?.length === 0;

  return (
    <SearchContainer
      sx={{
        display: isOpen ? 'flex' : 'none',
      }}
    >
      {isEmpty && <NotFound />}
      {!isEmpty && <ProductsContent products={products} />}
    </SearchContainer>
  );
};
