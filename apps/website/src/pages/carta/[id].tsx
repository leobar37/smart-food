import { ProductPage } from '../../modules/landing';
import { singleProductHandler } from '../../modules/landing/server';

export const getServerSideProps = singleProductHandler;

export default ProductPage;
