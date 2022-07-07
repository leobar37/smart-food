import { Button, Container, Stack, Text } from '@chakra-ui/react';
import { ItemCart, SectionItems } from '../components/Cart';
import Header from '../components/cartPage/header';
import { ModalCheckout } from '../components/checkout';
import { LandingLayout } from '../landingLayout';
const CartPage = () => {
  return (
    <LandingLayout mt={8}>
      <Header />
      <Container as="section" maxW={'5xl'}>
        <Stack
          direction={['column', null, 'row']}
          justifyContent="space-between"
        >
          <SectionItems title="Pedidos de la carta">
            {Array.from({ length: 3 }).map((_, idx) => (
              <ItemCart key={idx} />
            ))}
          </SectionItems>
          <SectionItems title="Pedidos de la carta">
            {Array.from({ length: 3 }).map((_, idx) => (
              <ItemCart key={idx} />
            ))}
          </SectionItems>
        </Stack>
        <Stack
          my={['2', null, '3']}
          mb={4}
          justifyContent={'center'}
          alignItems="center"
          as="footer"
        >
          <Text
            colorScheme={'smartgray'}
            fontWeight="semibold"
            fontSize={['xl', null, '2xl']}
            textAlign={'center'}
          >
            Total: S/.100.00
          </Text>
          <Button size={'lg'} colorScheme={'smartgreen'}>
            Realizar pedido
          </Button>
        </Stack>
      </Container>
      <ModalCheckout />
    </LandingLayout>
  );
};

export default CartPage;
