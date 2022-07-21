import { List } from '@chakra-ui/react';
import { Product } from '@smartfood/client/v2';
import { FC } from 'react';
import ProductItem from './ProductItem';

type ProductsContentProps = {
  products: Product[];
};

const ProductsContent: FC<ProductsContentProps> = ({ products }) => {
  const productsElements = (products ?? []).map((pr, idx, arr) => (
    <ProductItem
      key={idx}
      product={pr!}
      includeSeparator={idx !== arr.length - 1}
    />
  ));
  return <List className="content">{productsElements}</List>;
};

export default ProductsContent;
