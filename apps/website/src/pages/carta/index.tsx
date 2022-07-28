import { MenuPage } from '@App/features/menu';
import { menuHandler } from '@App/core/server';

export const getServerSideProps = menuHandler;

export default MenuPage;
