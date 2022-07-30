import { mutationsKeys } from '@App/core/constants';
import { useDetailedOrder } from '@App/core/modules/cart';
import { LandingLayout } from '@App/core/shared-components';
import { Button, Container, HStack, Stack, Text } from '@chakra-ui/react';
import { LoadingIcon } from '@smartfood/ui';
import { motion } from 'framer-motion';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useQueryClient } from 'react-query';
import { ItemCart, NotResults, SectionItems } from './components';
import Header from './components/header';

const LoadingMotion = motion(LoadingIcon);

const ProductsSide = () => {
  const detailedOrder = useDetailedOrder();
  const renderContent = (content: ReactNode) => {
    return <SectionItems title="Pedidos de la carta">{content}</SectionItems>;
  };

  const notFound = (
    <NotResults
      text={`No haz agregado ningún Poke Bowl o bebida de nuestra Carta.`}
    />
  );

  if (!detailedOrder) {
    return renderContent(notFound);
  }

  const { noArmedProducts } = detailedOrder;

  const content = (
    <>
      {noArmedProducts.map((line, idx) => (
        <ItemCart isEditable={false} line={line} key={line.id} />
      ))}
      {noArmedProducts.length === 0 && notFound}
    </>
  );

  return renderContent(content);
};

const ArmedProductsSide = () => {
  const detailedOrder = useDetailedOrder();

  const notFound = (
    <NotResults text={`No haz personalizado ningún Poke Bowl o bebida.`} />
  );

  const renderContent = (content: ReactNode) => {
    return <SectionItems title="Productos armados">{content}</SectionItems>;
  };

  if (!detailedOrder) {
    return renderContent(notFound);
  }
  const { armedProducts } = detailedOrder;

  const content = (
    <>
      {armedProducts.map((line, idx) => (
        <ItemCart isEditable line={line} key={line.id} />
      ))}
      {armedProducts.length === 0 && notFound}
    </>
  );

  return renderContent(content);
};

const CartPage = () => {
  const detailedOrder = useDetailedOrder();
  const queryClient = useQueryClient();

  const disableOrderButton = (detailedOrder?.linesWithProduct ?? 0) === 0;

  const router = useRouter();

  const showLoadingPrice = queryClient.isMutating({
    exact: true,
    mutationKey: mutationsKeys.updateLine,
  });

  return (
    <LandingLayout mt="10">
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
            onClick={() => {
              router.push('/checkout');
            }}
            colorScheme={'smartgreen'}
          >
            Realizar pedido
          </Button>
        </Stack>
      </Container>
    </LandingLayout>
  );
};

export default CartPage;
