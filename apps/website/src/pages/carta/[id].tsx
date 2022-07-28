import { ProductPage } from '../../features/landing';
import { singleProductHandler } from '@App/core/server';

export const getServerSideProps = singleProductHandler;

export default ProductPage;
