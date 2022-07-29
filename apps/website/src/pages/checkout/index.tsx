import { CheckoutPage } from '@App/features/checkout';
import { cartHandler } from '@App/core/server';
export const getServerSideProps = cartHandler;
export default CheckoutPage;
