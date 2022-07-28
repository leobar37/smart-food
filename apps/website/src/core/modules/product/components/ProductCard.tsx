import { Button, Link, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Product } from '@smartfood/client/v2';
import { CardProduct, SliderCounter } from '@smartfood/ui';
import NextLink from 'next/link';
import { FC, useEffect, useState } from 'react';
import {
  useAddToCart,
  useGetProductLine,
  useDebounceUpdateLine,
} from '../../cart';
import { useBreakpointValueSSR } from '../../../../core/hooks/useBreakpointValue';

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

  const [productSelected, setProductSelected] = useState(isSelected);
  const addToCartMutation = useAddToCart();

  const updateLine = useDebounceUpdateLine();

  useEffect(() => {
    if (quantity > 1 && line?.id) {
      updateLine({
        lineId: line?.id,
        quantity: quantity,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  return (
    <LinkBox mb="16" width="max-content" mx={['auto']}>
      <CardProduct
        size={cardSize as any}
        button={
          <Button
            variant={productSelected ? 'solid' : 'outline'}
            onClick={() => {
              if (productSelected) {
                return null;
              }
              addToCartMutation.mutate(
                {
                  productId: product.id,
                  quantity: 1,
                },
                {
                  onError: () => {
                    setProductSelected(false);
                  },
                  onSettled: () => {
                    setProductSelected(true);
                  },
                },
              );
              setProductSelected(true);
              setQuantity(1);
            }}
          >
            {productSelected ? `Agregado` : 'Agregar al carrito'}
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
