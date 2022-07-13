import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { CardProduct, SliderCounter } from '@smartfood/ui';
import { Product } from '@smartfood/client/v2';
import { FC } from 'react';

type ProductsGridProps = {
  title: string;
  description: string;
  products: Product[];
};

export const ProductsGrid: FC<ProductsGridProps> = ({
  title,
  description,
  products,
}) => {
  const sizeProductCard = useBreakpointValue<'mobile' | 'desktop'>({
    base: 'mobile',
    lg: 'desktop',
  });
  return (
    <Container
      maxWidth={'7xl'}
      sx={{
        my: 5,
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          py: '3',
        }}
      >
        <Text
          fontWeight={'semibold'}
          fontSize={['2xl', null, '3xl']}
          textColor={'smartgreen.700'}
          textAlign="center"
          my={2}
        >
          {title}
        </Text>
        <Text fontSize={['md', null, 'lg']}>{description}</Text>
      </Box>
      <Flex flexWrap={['wrap']} mx="auto" my="3" justifyContent="center">
        {products.map((pr, idx) => (
          <CardProduct
            sx={{
              my: [2, null, 4],
              mx: [3, null, 6],
            }}
            size={sizeProductCard}
            content={{
              title: pr?.name ?? '',
              description: pr?.excerpt ?? '',
              image: pr?.photo?.publicUrlTransformed || '',
              price: pr?.price || 0,
            }}
            counter={<SliderCounter value={10} />}
            button={<Button>Agregar al carrito</Button>}
            key={pr?.id}
          />
        ))}
      </Flex>
    </Container>
  );
};
