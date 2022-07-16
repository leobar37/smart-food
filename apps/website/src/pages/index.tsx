import Home from '../modules/landing/views/Home';
import { homeHandler } from '../modules/landing/server';

export const getServerSideProps = homeHandler;

export default Home;

// header
