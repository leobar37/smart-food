import { Box, Container, Image, Stack, Text, Button } from '@chakra-ui/react';
import { SliderCounter } from '@smartfood/ui';
import { LandingLayout } from '../landingLayout';
const ProductPage = () => {
  return (
    <LandingLayout>
      <Container maxWidth={'6xl'}>
        <Stack
          direction={['column', null, 'row']}
          align={['initial', null, 'center']}
          spacing={[1, null, 6]}
          sx={{
            my: 8,
          }}
        >
          <Box
            as="figure"
            sx={{
              w: 'full',
              overflow: 'hidden',
              rounded: 'lg',
            }}
          >
            <Image
              alt="text"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            />
          </Box>
          <Stack direction={'column'} spacing={4}>
            <Text
              fontSize={['2xl', null, '5xl']}
              fontWeight="semibold"
              color="smartgreen.500"
            >
              Plato 1
            </Text>
            <Text fontSize={['md', null, 'lg']}>
              Arroz integral, quinua, mix de lechugas, salmón marinado, atún
              marinado, palta, col morada, mango, salsa taré, shoyu, chalaquita,
              togarashi, maní picado, nori.
            </Text>
            <Stack spacing={3}>
              <SliderCounter value={1} />
              <Text
                fontWeight={'semibold'}
                fontSize={'2xl'}
                color="smartgreen.500"
              >
                S/ 24.90
              </Text>
            </Stack>
            <Stack direction={['column', 'row']}>
              <Button variant={'outline'} size="lg" colorScheme="smartgray">
                Agregar carrito
              </Button>
              <Button size="lg" colorScheme="smartgray">
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
