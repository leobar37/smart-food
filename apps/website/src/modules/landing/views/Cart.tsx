import { Button, Container, Stack, Text } from '@chakra-ui/react';
import { get } from 'lodash';
import { ItemCart, SectionItems } from '../components/Cart';
import Header from '../components/cartPage/header';
import { ModalCheckout, SendModal } from '../components/checkout';
import { useDetailedOrder } from '../controllers/cart';
import { LandingLayout } from '../landingLayout';
const ProductsSide = () => {
  const detailedOrder = useDetailedOrder();
  // TODO: add not result component
  if (!detailedOrder) {
    return null;
  }
  const { noArmedProducts } = detailedOrder;
  return (
    <SectionItems title="Pedidos de la carta">
      {noArmedProducts.map((line, idx) => (
        <ItemCart isEditable={false} line={line} key={idx} />
      ))}
    </SectionItems>
  );
};

const ArmedProductsSide = () => {
  const detailedOrder = useDetailedOrder();
  //TODO: add not result component
  if (!detailedOrder) {
    return null;
  }
  const { armedProducts } = detailedOrder;

  return (
    <SectionItems title="Pedidos de la carta">
      {armedProducts.map((line, idx) => (
        <ItemCart isEditable line={line} key={idx} />
      ))}
    </SectionItems>
  );
};

const CartPage = () => {
  const detailedOrder = useDetailedOrder();
  return (
    <LandingLayout>
      <Header />
      <Container as="section" maxW={'5xl'}>
        <Stack
          direction={['column', null, 'row']}
          justifyContent="space-between"
        >
          <ProductsSide />
          <ArmedProductsSide />
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
            Total: {get(detailedOrder, 'totalPrice', 0)} S/.
          </Text>
          <Button size={'lg'} colorScheme={'smartgreen'}>
            Realizar pedido
          </Button>
        </Stack>
      </Container>
      <ModalCheckout />
      <SendModal />
    </LandingLayout>
  );
};

export default CartPage;
