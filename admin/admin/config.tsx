import { AdminConfig } from '@keystone-6/core/types';
import { CustomLogo } from './components/CustomLogo';
import { CustomNavigation } from './components/Navigation';

export const components: AdminConfig['components'] = {
  Logo: CustomLogo,
  Navigation: CustomNavigation,
};
