import { extendTheme } from '@chakra-ui/react';
import { ThemeConfig } from '@chakra-ui/theme';
import foundations from './foundations';
import components from './components'
import styles from './styles'
const config: ThemeConfig = {
  cssVarPrefix: 'smartfood',
  useSystemColorMode: false,
  initialColorMode: 'light',
};

export const theme = extendTheme({
  config,
  ...foundations,
  styles,
  components
});

export default theme;
