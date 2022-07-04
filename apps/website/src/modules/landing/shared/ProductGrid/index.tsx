import {
  Box,
  Button,
  Container,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { CardProduct, SliderCounter } from '@smartfood/ui';
import { HiChevronDoubleRight } from 'react-icons/hi';
const productProps = {
  content: {
    title: 'Plato 1',
    description: `Mix de lechugas, quinua, chalaquita, atún, salsa de tiradito, salsa
  acevichada.`,
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    price: 24.9,
  },
  button: <Button>Agregar al carrito</Button>,
  counter: <SliderCounter value={10} />,
};

export const ProductsGrid = () => {
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
          Prueba nuestros armados para ti
        </Text>
        <Text fontSize={['md', null, 'lg']}>
          Elige entre toda la variedad de platos deliciosos que hemos armado
          pensando en ti.
        </Text>
      </Box>
      <Flex flexWrap={['wrap']} mx="auto" my="3" justifyContent="center">
        {Array.from({ length: 6 }).map((_, idx) => (
          <CardProduct
            sx={{
              my: [2, null, 4],
              mx: [3, null, 6],
            }}
            size={sizeProductCard}
            {...productProps}
            key={idx}
          />
        ))}
      </Flex>
    </Container>
  );
};
