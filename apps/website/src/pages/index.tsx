import Home from '../modules/landing/views/Home';
import { productsHandler } from '../modules/landing/server';

export const getServerSideProps = productsHandler;

export default Home;

// header
