import { Button, Link, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Product } from '@smartfood/client/v2';
import { CardProduct, SliderCounter } from '@smartfood/ui';
import NextLink from 'next/link';
import { FC, useState } from 'react';
import { useAddToCart } from '../../controllers';
import { useBreakpointValueSSR } from '../../hooks/useBreakpointValue';
import { useGetProductLine } from '../../controllers';

type ProductCardProps = {
  product: Product;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const cardSize = useBreakpointValueSSR({
    base: 'mobile',
    lg: 'desktop',
  });

  const { isSelected, line } = useGetProductLine(product.id);
  const [quantity, setQuantity] = useState(line?.quantity ?? 0);

  const addToCartMutation = useAddToCart();

  console.log({
    isSelected,
    line,
  });

  return (
    <LinkBox mb="16" width="max-content" mx={['auto']}>
      <CardProduct
        size={cardSize as any}
        button={
          <Button
            variant={isSelected ? 'solid' : 'outline'}
            onClick={() => {
              if (isSelected) {
                return null;
              }
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
            {isSelected ? `Agregado` : 'Agregar al carrito'}
          </Button>
        }
        counter={
          isSelected ? (
            <SliderCounter
              onPlus={() => setQuantity((prev) => prev + 1)}
              onMinus={() => setQuantity((prev) => Math.max(prev - 1, 1))}
              value={quantity}
            />
          ) : null
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
