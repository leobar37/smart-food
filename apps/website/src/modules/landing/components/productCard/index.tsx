import { Button, Link, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Product } from '@smartfood/client/v2';
import { CardProduct, SliderCounter } from '@smartfood/ui';
import NextLink from 'next/link';
import { FC, useState } from 'react';
import { useAddToCart } from '../../controllers';
import { useBreakpointValueSSR } from '../../hooks/useBreakpointValue';
type ProductCardProps = {
  product: Product;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const cardSize = useBreakpointValueSSR({
    base: 'mobile',
    lg: 'desktop',
  });

  const [quantity, setQuantity] = useState(1);

  const addToCartMutation = useAddToCart();
  return (
    <LinkBox mb="16" width="max-content" mx={['auto']}>
      <CardProduct
        size={cardSize as any}
        button={
          <Button
            onClick={() => {
              addToCartMutation.mutate(
                {
                  productId: product.id,
                  quantity: quantity,
                },
                {
                  onSettled: () => {
                    setQuantity(1);
                  },
                },
              );
            }}
          >
            Agregar al carrito
          </Button>
        }
        counter={
          <SliderCounter
            onPlus={() => setQuantity((prev) => prev + 1)}
            onMinus={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            value={quantity}
          />
        }
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
