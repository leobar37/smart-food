import { useBreakpointValueSSR } from '@App/core/hooks';
import { Button, Link, useUpdateEffect } from '@chakra-ui/react';
import { Product } from '@smartfood/client/v2';
import { BtnIcon, CardProduct, SliderCounter, TrashIcon } from '@smartfood/ui';
import NextLink from 'next/link';
import { FC, useEffect, useMemo, useState } from 'react';
import {
  useAddToCart,
  useDebounceUpdateLine,
  useDeleteOrderLine,
  useGetProductLine,
} from '../../cart';

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

  // const [productSelected, setProductSelected] = useState(isSelected);
  const addToCartMutation = useAddToCart();
  const updateLine = useDebounceUpdateLine();
  const deleteLine = useDeleteOrderLine();

  const productSelected = isSelected || quantity > 0;

  useEffect(() => {
    if (line) {
      setQuantity(line.quantity ?? 0);
    }
    if (!isSelected) {
      setQuantity(0);
    }
    // setProductSelected(isSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line]);

  useUpdateEffect(() => {
    if ((quantity > 1 || quantity === 0) && line?.id) {
      updateLine({
        lineId: line?.id,
        quantity: quantity,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const buttonAddOrDeleteNode = useMemo(() => {
    if (!productSelected) {
      return (
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
                onError: () => {},
                onSettled: () => {},
              },
            );
            setQuantity(1);
          }}
        >
          {productSelected && quantity > 0 ? `Agregado` : 'Agregar al carrito'}
        </Button>
      );
    }
    return (
      <BtnIcon
        as="button"
        sx={{
          svg: {
            fontSize: 'md',
          },
        }}
        onClick={() => {
          if (line?.id) {
            deleteLine.mutateAsync(line?.id);
          }
        }}
      >
        <TrashIcon />
      </BtnIcon>
    );
  }, [
    quantity,
    addToCartMutation,
    line?.id,
    product.id,
    deleteLine,
    productSelected,
  ]);

  const disabledCounterGeneral = quantity === 0;

  return (
    <CardProduct
      mx={['auto']}
      mb="16"
      width="max-content"
      size={cardSize as any}
      button={buttonAddOrDeleteNode}
      counter={
        <SliderCounter
          plusDisabled={disabledCounterGeneral}
          minusDisabled={disabledCounterGeneral}
          onPlus={() => setQuantity((prev) => prev + 1)}
          onMinus={() => setQuantity((prev) => Math.max(prev - 1, 0))}
          value={quantity}
        />
      }
      content={{
        description: product?.excerpt ?? '',
        image: product.photo?.publicUrlTransformed ?? '',
        price: product?.price ?? 0,
        title: (
          <NextLink href={`/carta/${product.id}`} passHref>
            <Link cursor={'pointer'}>{product?.name ?? ''}</Link>
          </NextLink>
        ),
      }}
    />
  );
};

export default ProductCard;
