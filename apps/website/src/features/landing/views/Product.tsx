import {
  useAddToCart,
  useDebounceUpdateLine,
  useDeleteOrderLine,
  useGetProductLine,
  useUpdateOrderLineIsMutating,
} from '@App/core/modules/cart';
import { useSingleProduct } from '@App/core/modules/product';
import { LandingLayout } from '@App/core/shared-components';
import {
  Box,
  Button,
  Container,
  HStack,
  Image,
  Stack,
  Text,
  useUpdateEffect,
} from '@chakra-ui/react';
import { BackButton, BtnIcon, SliderCounter, TrashIcon } from '@smartfood/ui';
import { isNil } from 'lodash';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { LoadingIcon } from '@smartfood/ui';

const LoadingAnimation = motion(LoadingIcon);
type ContentProps = {
  text: string;
};

const Content: FC<ContentProps> = ({ text }) => {
  return (
    <Box
      mx="5"
      sx={{
        color: 'smartgray.500',
        li: {
          ml: '8',
        },
        ul: {
          my: 2,
        },
      }}
    >
      <ReactMarkdown
        components={{
          h2: ({ children }) => {
            return (
              <Text my="2" fontWeight={'semibold'} fontSize="lg">
                {children}
              </Text>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </Box>
  );
};

const LoadingIconWheOrderIsMutating = () => {
  const isMutating = useUpdateOrderLineIsMutating();
  return isMutating ? (
    <LoadingAnimation
      color="smartgreen.500"
      animate={{
        rotate: 360,
      }}
      transition={{
        repeat: Infinity,
        ease: 'linear',
        duration: 0.8,
      }}
    />
  ) : null;
};

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data: product } = useSingleProduct(id);
  const { line, isSelected } = useGetProductLine(id);
  const updateLineDebounced = useDebounceUpdateLine();
  const deleteLine = useDeleteOrderLine();
  const [quantity, setQuantity] = useState(0);
  const addToCart = useAddToCart();

  useEffect(() => {
    if (line) {
      setQuantity(line.quantity ?? 0);
    }
  }, [line]);

  useUpdateEffect(() => {
    if (line?.id) {
      // When this is updating loading icon is needed
      updateLineDebounced({
        lineId: line?.id,
        quantity: quantity,
      });
    } else {
      setQuantity(0);
    }
  }, [quantity, updateLineDebounced, line]);

  if (isNil(product)) {
    return null;
  }

  const textDescription =
    product.description ||
    (product.description && product.description.length > 0)
      ? product.description
      : product.excerpt;

  const deleteOrdAddButtonNode = !isSelected ? (
    <Button
      isLoading={addToCart.isLoading}
      loadingText={'Guardando...'}
      onClick={() => {
        addToCart.mutate({
          productId: product.id,
          quantity: 1,
        });
      }}
      variant={'outline'}
      size="lg"
      colorScheme="smartgray"
    >
      Agregar al carrito
    </Button>
  ) : (
    <BtnIcon
      onClick={() => {
        deleteLine.mutate(line?.id!);
      }}
    >
      <TrashIcon />
    </BtnIcon>
  );

  return (
    <LandingLayout titlePage="Producto">
      <Container maxWidth={'6xl'} my="28" position={'relative'}>
        <Stack
          direction={['column', null, 'row']}
          align={['initial', null, 'start']}
          spacing={[1, null, 8]}
          sx={{
            my: 8,
          }}
        >
          <Box
            as="figure"
            maxWidth={'32rem'}
            sx={{
              w: 'full',
              overflow: 'hidden',
              rounded: 'lg',
              mt: ['initial', null, '12'],
            }}
          >
            <Image alt="text" src={product.photo?.publicUrlTransformed ?? ''} />
          </Box>
          <Stack direction={'column'} spacing={4}>
            <HStack mt={['8']}>
              <BackButton
                onClick={() => {
                  router.back();
                }}
                position={'absolute'}
                left="2"
                top={['-10', null, '-3']}
              >
                Volver
              </BackButton>
              <Text
                fontSize={['2xl', null, '5xl']}
                fontWeight="semibold"
                color="smartgreen.500"
              >
                {product.name}
              </Text>
            </HStack>
            <Content text={textDescription ?? ''} />
            <Stack spacing={3}>
              <HStack>
                <SliderCounter
                  minusDisabled={!isSelected}
                  plusDisabled={!isSelected}
                  onMinus={() => {
                    setQuantity((prev) => Math.max(prev - 1, 0));
                  }}
                  onPlus={() => {
                    setQuantity((prev) => prev + 1);
                  }}
                  value={quantity}
                />
                <LoadingIconWheOrderIsMutating />
              </HStack>
              <Text
                fontWeight={'semibold'}
                fontSize={'2xl'}
                color="smartgreen.500"
              >
                {product.price} S/.
              </Text>
            </Stack>
            <Stack direction={['column', 'row']}>
              {deleteOrdAddButtonNode}
              <Button
                onClick={() => {
                  router.push('/checkout');
                }}
                size="lg"
                colorScheme="smartgray"
              >
                Pedir ahora
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </LandingLayout>
  );
};
export default ProductPage;
