import {
  Button,
  useBreakpointValue,
  Link,
  LinkOverlay,
} from '@chakra-ui/react';
import { Product } from '@smartfood/client/v2';
import { CardProduct, SliderCounter } from '@smartfood/ui';
import NextLink from 'next/link';
import { FC } from 'react';

type ProductCardProps = {
  product: Product;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const cardSize = useBreakpointValue({
    base: 'mobile',
    lg: 'desktop',
  });

  return (
    <CardProduct
      mb="16"
      mx={['auto']}
      size={cardSize as any}
      button={<Button>Agregar al carrito</Button>}
      counter={<SliderCounter value={10} />}
      content={{
        description: product?.excerpt ?? '',
        image: product.photo?.publicUrlTransformed ?? '',
        price: product?.price ?? 0,
        title: (
          <NextLink href={`/carta/${product.id}`} passHref>
            <Link>{product?.name ?? ''}</Link>
          </NextLink>
        ),
      }}
    />
  );
};

export default ProductCard;
