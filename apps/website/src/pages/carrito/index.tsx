import { CartPage } from '../../modules/landing';
import { cartHandler } from '../../modules/landing/server';

export const getServerSideProps = cartHandler;
export default CartPage;
