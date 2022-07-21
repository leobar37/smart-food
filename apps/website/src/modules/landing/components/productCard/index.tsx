import {
  Button,
  useBreakpointValue,
  Link,
  LinkOverlay,
  LinkBox,
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
    <LinkBox mb="16" width="max-content" mx={['auto']}>
      <CardProduct
        size={cardSize as any}
        button={
          <Button
            onClick={() => {
              console.log('this working');
            }}
          >
            Agregar al carrito
          </Button>
        }
        counter={<SliderCounter value={10} />}
        content={{
          description: product?.excerpt ?? '',
          image: product.photo?.publicUrlTransformed ?? '',
          price: product?.price ?? 0,
          title: (
            <NextLink href={`/carta/${product.id}`} passHref>
              <LinkOverlay as={Link}>{product?.name ?? ''}</LinkOverlay>
            </NextLink>
          ),
        }}
      />
    </LinkBox>
  );
};

export default ProductCard;
