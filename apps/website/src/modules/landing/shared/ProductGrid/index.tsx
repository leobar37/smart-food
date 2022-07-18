import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { Product } from '@smartfood/client/v2';
import { FC } from 'react';
import ProductCard from '../../components/productCard';

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
        {products.map((pr) => (
          <ProductCard product={pr} key={pr?.id} />
        ))}
      </Flex>
    </Container>
  );
};
