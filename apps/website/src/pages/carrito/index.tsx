import { CartPage } from '../../features/cart';
import { cartHandler } from '@App/core/server';

export const getServerSideProps = cartHandler;
export default CartPage;
