import { HomePage } from '../features/landing';
import { homeHandler } from '@App/core/server';

export const getServerSideProps = homeHandler;

export default HomePage;

// header
