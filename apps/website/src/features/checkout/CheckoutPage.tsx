import { useBreakpointValueSSR } from '@App/core/hooks';
import { LandingLayout } from '@App/core/shared-components';
import { HStack } from '@chakra-ui/react';
import DetailedProductsModal from './components/DetaileProductsModal';
import DetailProducts from './components/DetailProducts';
import FormCheckout from './components/FormCheckout';
import { ConfirmationModal } from './components/SendModal';
const CheckoutPage = () => {
  const modalIsVisble = useBreakpointValueSSR([true, true, false]);

  return (
    <LandingLayout mt={10}>
      <HStack justifyContent={'center'} my={['2', null, '24']}>
        <HStack
          spacing={24}
          width={['xl', '2xl', null, '4xl']}
          alignItems="flex-start"
          mx="auto"
        >
          <FormCheckout />
          {!modalIsVisble && <DetailProducts />}
        </HStack>
      </HStack>
      <DetailedProductsModal />
      <ConfirmationModal />
    </LandingLayout>
  );
};

export default CheckoutPage;
