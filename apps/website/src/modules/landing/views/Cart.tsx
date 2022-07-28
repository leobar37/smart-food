import { Button, Container, HStack, Stack, Text } from '@chakra-ui/react';
import { LoadingIcon } from '@smartfood/ui';
import { motion } from 'framer-motion';
import { get } from 'lodash';
import { useQueryClient } from 'react-query';
import { ItemCart, NotResults, SectionItems } from '../components/Cart';
import Header from '../components/cartPage/header';
import { ModalCheckout, SendModal } from '../components/checkout';
import { mutationsKeys } from '../constants';
import { useDetailedOrder } from '../controllers/cart';
import { LandingLayout } from '../landingLayout';
const LoadingMotion = motion(LoadingIcon);

const ProductsSide = () => {
  const detailedOrder = useDetailedOrder();
  if (!detailedOrder) {
    return <NotResults />;
  }
  const { noArmedProducts } = detailedOrder;

  return (
    <SectionItems title="Pedidos de la carta">
      {noArmedProducts.map((line, idx) => (
        <ItemCart isEditable={false} line={line} key={line.id} />
      ))}
      {noArmedProducts.length === 0 && (
        <NotResults
          text={`No haz agregado ningún Poke Bowl o bebida de nuestra Carta.`}
        />
      )}
    </SectionItems>
  );
};

const ArmedProductsSide = () => {
  const detailedOrder = useDetailedOrder();
  if (!detailedOrder) {
    return <NotResults />;
  }
  const { armedProducts } = detailedOrder;

  return (
    <SectionItems title="Pedidos de la carta">
      {armedProducts.map((line, idx) => (
        <ItemCart isEditable line={line} key={line.id} />
      ))}
      {armedProducts.length === 0 && (
        <NotResults text={`No haz personalizado ningún Poke Bowl o bebida.`} />
      )}
    </SectionItems>
  );
};

const CartPage = () => {
  const detailedOrder = useDetailedOrder();
  const queryClient = useQueryClient();
  const disableOrderButton =
    detailedOrder?.orderQuery.data?.lines?.length === 0;

  const showLoadingPrice = queryClient.isMutating({
    exact: true,
    mutationKey: mutationsKeys.updateLine,
  });

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
          my={['2', null, '8']}
          mb={8}
          justifyContent={'center'}
          alignItems="center"
          as="footer"
        >
          <HStack>
            <Text
              color={'smartgray.700'}
              fontWeight="semibold"
              fontSize={['xl', null, '2xl']}
              textAlign={'center'}
            >
              Total: {get(detailedOrder, 'totalPrice', 0)} S/.
            </Text>

            {showLoadingPrice && (
              <LoadingMotion
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
            )}
          </HStack>
          <Button
            disabled={disableOrderButton}
            size={'lg'}
            colorScheme={'smartgreen'}
          >
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
