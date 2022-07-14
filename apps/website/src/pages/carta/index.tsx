import { MenuPage } from '../../modules/landing';
import { menuHandler } from '../../modules/landing/server';

export const getServerSideProps = menuHandler;

export default MenuPage;
